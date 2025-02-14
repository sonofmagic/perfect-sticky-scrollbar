import { debounce, throttle } from 'es-toolkit'
import { nextTick } from 'vue'
import './style.scss'

export interface ScrollBindingValue {
  root?: Element | null
  rootMargin?: string
  threshold?: number[]
  isObserve?: boolean // 是否使用IntersectionObserver监听
  top?: number // 距离上面的偏移量
  bottom?: number // 距离下面的偏移量
}

interface ObserveElement extends ScrollBindingValue {
  rect?: {
    top: number
    bottom: number
  }
  elTableBodyWrapper?: Element | null
  tableElement?: HTMLTableElement | null
  scrollbarElement?: HTMLDivElement | null
  innerScrollbarElement?: HTMLDivElement | null
  observe?: IntersectionObserver
  bodyObserver?: ResizeObserver
  rootObserver?: ResizeObserver
  handleResizeListener?: EventListener
  handleScrollbarListener?: EventListener
  handleRootScrollListener?: EventListener
}

const weakMap = new WeakMap()

/**
 * desc: 判断被监听DOM与视图的大小
 * 1.若DOM小于视图，则threshold设置为0-1，并且均分为20份
 * 2.若DOM大于等于视图，则threshold设置为0-（innerHeight / scrollHeight），并且均分22份
 */
function calcThreshold(scrollHeight: number, innerHeight: number) {
  const max = innerHeight >= scrollHeight ? 1 : Number.parseFloat((innerHeight / scrollHeight).toFixed(4))
  const part = 20
  const partSize = max / part
  const result = []
  const len = (max === 1 ? part : part + 2)
  for (let i = 0; i <= len; i++) {
    result.push(partSize * i)
  }
  return result
}

// 监听底部滚动条滚动，table随之滚动
function handleScrollbarListener(el: HTMLDivElement) {
  const observeElement = weakMap.get(el)
  const { elTableBodyWrapper, scrollbarElement } = observeElement
  elTableBodyWrapper!.scrollLeft = scrollbarElement?.scrollLeft || 0
}

/**
 * 监听DOM是否进入视图中
 * 未进入视图则隐藏底部scrollbar
 * 进入视图且bottom大于视图的高度则显示底部scrollbar
 */
function intersectionObserverTable(el: HTMLDivElement) {
  nextTick(() => {
    const observeElement: ObserveElement = weakMap.get(el)
    if (observeElement) {
      let { scrollbarElement, elTableBodyWrapper, innerScrollbarElement, tableElement, root, rootMargin, threshold, observe } = observeElement
      if (!threshold?.length) {
        threshold = calcThreshold(el.scrollHeight, window.innerHeight)
      }
      scrollbarElement!.style.width = `${elTableBodyWrapper?.clientWidth}px`
      innerScrollbarElement!.style.width = `${tableElement?.scrollWidth}px`
      observeElement.handleScrollbarListener = () => handleScrollbarListener(el)
      scrollbarElement!.addEventListener('scroll', observeElement!.handleScrollbarListener!)
      observe = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const { bottom } = entry.boundingClientRect
            const viewportHeight = window.innerHeight
            if (entry.isIntersecting) {
              if (
                scrollbarElement
                && elTableBodyWrapper
                && (bottom > viewportHeight)
              ) {
                scrollbarElement.style.display = 'block'
                scrollbarElement.scrollLeft = elTableBodyWrapper.scrollLeft
              }
              else {
                scrollbarElement!.style.display = 'none'
              }
            }
            else {
              scrollbarElement!.style.display = 'none'
            }
          })
        },
        {
          root, // 默认是视口
          rootMargin: rootMargin!,
          threshold: threshold!,
        },
      )
      observe.observe(el)
    }
  })
}

// root滚动显示隐藏滚动条
function handleScrollListener(el: HTMLDivElement) {
  const observeElement = weakMap.get(el)
  const { innerHeight, scrollY } = window
  if (observeElement) {
    const { scrollbarElement, elTableBodyWrapper, top, bottom, rect } = observeElement
    if (scrollbarElement) {
      if ((scrollY + innerHeight >= rect.bottom + bottom) || (window.scrollY + innerHeight <= (rect.top + top))) { // 展示
        scrollbarElement.style.display = 'none'
      }
      else {
        observeElement!.scrollbarElement!.style.display = 'block'
        if (elTableBodyWrapper) {
          scrollbarElement.scrollLeft = elTableBodyWrapper?.scrollLeft
        }
      }
    }
  }
}

// root scroll listener
function rootScrollListener(el: HTMLDivElement) {
  const observeElement: ObserveElement = weakMap.get(el)
  if (observeElement?.handleRootScrollListener) {
    window.removeEventListener('scroll', observeElement.handleRootScrollListener)
  }
  if (observeElement?.handleScrollbarListener) {
    window.removeEventListener('scroll', observeElement.handleScrollbarListener)
  }
  nextTick(() => {
    const { tableElement, elTableBodyWrapper, scrollbarElement } = observeElement
    observeElement.scrollbarElement!.style.width = `${elTableBodyWrapper?.clientWidth}px`
    observeElement.innerScrollbarElement!.style.width = `${tableElement?.scrollWidth}px`
    const rect = elTableBodyWrapper?.getBoundingClientRect()
    observeElement.rect = {
      top: ((rect?.top || 0) + window.scrollY),
      bottom: ((rect?.bottom || 0) + window.scrollY),
    }
    if ((rect?.top || 0) >= window.innerHeight || (rect?.bottom || 0) <= window.innerHeight) {
      scrollbarElement!.style.display = 'none'
    }
    else {
      scrollbarElement!.style.display = 'block'
    }
    observeElement.handleScrollbarListener = throttle(() => handleScrollbarListener(el), 100)
    scrollbarElement!.addEventListener('scroll', observeElement.handleScrollbarListener!)
    observeElement.handleRootScrollListener = throttle(() => handleScrollListener(el), 300)
    window.addEventListener('scroll', observeElement.handleRootScrollListener!)
  })
}

// 监听body或者dom的尺寸是否发生变化，变化则重新计算
function resizeObserver(root: Element, el: HTMLDivElement) {
  const observeElement: ObserveElement = weakMap.get(el)
  const handleResize = debounce(() => {
    if (observeElement?.isObserve) {
      intersectionObserverTable(el)
    }
    else {
      rootScrollListener(el)
    }
  }, 300)
  const resizeObserver = new ResizeObserver(handleResize)
  resizeObserver.observe(root)
  return handleResize
}

// 底部插入滚动条
function insertBottomScrollbar(el: HTMLDivElement) {
  const observeElement = weakMap.get(el)
  if (observeElement) {
    observeElement.scrollbarElement = document.createElement('div')
    observeElement.scrollbarElement.className = 'directive-scrollbar-table-wrapper'
    observeElement.innerScrollbarElement = document.createElement('div')
    observeElement.innerScrollbarElement.style.height = '20px'
    observeElement.scrollbarElement.appendChild(observeElement.innerScrollbarElement)
    el.insertAdjacentElement('afterend', observeElement.scrollbarElement)
  }
}

// 监听root滚动
function listener(el: HTMLDivElement, binding: { value?: ScrollBindingValue }) {
  const { root, rootMargin = '10px 0px', threshold, top = 100, bottom = 0, isObserve } = binding.value || {}
  const observeElement: ObserveElement = {
    root,
    rootMargin,
    threshold,
    top,
    bottom,
    isObserve,
    elTableBodyWrapper: el.querySelector(
      '.el-table__body-wrapper',
    ),
    tableElement: el.querySelector('table'),
    observe: undefined,
    handleResizeListener: undefined,
  }
  weakMap.set(el, observeElement)
  insertBottomScrollbar(el)
  rootScrollListener(el)
  observeElement.handleResizeListener = () => rootScrollListener(el)
  window.addEventListener('resize', observeElement.handleResizeListener)
  const bodyResizeObserver = resizeObserver(document.body, el)
  observeElement.bodyObserver = bodyResizeObserver
  const elResizeObserver = resizeObserver(el, el)
  observeElement.rootObserver = elResizeObserver
}

// 使用IntersectionObserver监听DOM出现在视口
function observer(el: HTMLDivElement, binding: { value?: ScrollBindingValue }) {
  const { root, rootMargin = '10px 0px', threshold } = binding.value || {}
  const observeElement: ObserveElement = {
    root,
    rootMargin,
    threshold,
    elTableBodyWrapper: el.querySelector(
      '.el-table__body-wrapper',
    ),
    tableElement: el.querySelector('table'),
    observe: undefined,
    handleResizeListener: undefined,
  }
  weakMap.set(el, observeElement)
  insertBottomScrollbar(el)
  intersectionObserverTable(el)
  observeElement.handleResizeListener = () => intersectionObserverTable(el)
  window.addEventListener('resize', observeElement.handleResizeListener)
  const bodyResizeObserver = resizeObserver(document.body, el)
  observeElement.bodyObserver = bodyResizeObserver
  const elResizeObserver = resizeObserver(el, el)
  observeElement.rootObserver = elResizeObserver
}

export const vScrollbarTable = {
  inserted(el: HTMLDivElement, binding: { value?: ScrollBindingValue }) {
    if (binding.value && !binding.value.isObserve) {
      observer(el, binding)
    }
    else {
      listener(el, binding)
    }
  },
  unbind(el: HTMLDivElement) {
    const observeElement: ObserveElement = weakMap.get(el)
    if (observeElement) {
      observeElement.observe?.unobserve?.(el)
      observeElement.bodyObserver?.unobserve?.(el)
      observeElement.rootObserver?.unobserve?.(el)
      if (observeElement.handleResizeListener) {
        window.removeEventListener('resize', observeElement.handleResizeListener)
      }
      if (observeElement.handleRootScrollListener) {
        window.removeEventListener('scroll', observeElement.handleRootScrollListener!)
      }
    }
  },
}
