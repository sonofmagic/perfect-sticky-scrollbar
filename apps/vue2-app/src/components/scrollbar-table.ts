import { nextTick } from 'vue'
import { useStickyBox } from './use-sticky-box'
import './style.scss'

interface ObserveElement {
  root?: Element | null
  rootMargin?: string
  threshold?: number[]
  isObserve?: boolean // 是否使用IntersectionObserver监听
  top?: number // 距离上面的偏移量
  bottom?: number // 距离下面的偏移量
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
}

const weakMap = new WeakMap()

// root scroll listener
function rootScrollListener(el: HTMLDivElement) {
  const observeElement: ObserveElement = weakMap.get(el)

  nextTick(() => {
    const { tableElement, elTableBodyWrapper, scrollbarElement } = observeElement
    observeElement.scrollbarElement!.style.width = `${elTableBodyWrapper?.clientWidth}px`
    observeElement.innerScrollbarElement!.style.width = `${tableElement?.scrollWidth}px`
    scrollbarElement!.addEventListener('scroll', () => {
      elTableBodyWrapper!.scrollLeft = scrollbarElement!.scrollLeft
    })
    elTableBodyWrapper?.addEventListener(
      'scroll',
      () => {
        scrollbarElement!.scrollLeft = elTableBodyWrapper!.scrollLeft
      },
    )
  })
}

// 底部插入滚动条
function insertBottomScrollbar(el: HTMLDivElement) {
  const observeElement = weakMap.get(el)
  if (observeElement) {
    observeElement.scrollbarElement = document.createElement('div')
    observeElement.scrollbarElement.className = 'ps__rail-x'
    observeElement.innerScrollbarElement = document.createElement('div')
    observeElement.innerScrollbarElement.style.height = '20px'
    observeElement.scrollbarElement.appendChild(observeElement.innerScrollbarElement)
    el.insertAdjacentElement('afterend', observeElement.scrollbarElement)
    useStickyBox(observeElement.scrollbarElement, { bottom: true, offsetBottom: 8 })
  }
}

// 监听root滚动
function listener(el: HTMLDivElement) {
  const observeElement: ObserveElement = {
    elTableBodyWrapper: el.querySelector(
      '.el-table__body-wrapper',
    ),
    tableElement: el.querySelector('table'),
    observe: undefined,
  }
  weakMap.set(el, observeElement)
  insertBottomScrollbar(el)
  rootScrollListener(el)
}

export const vScrollbarTable = {
  inserted(el: HTMLDivElement) {
    listener(el)
  },
  unbind() {

  },
}
