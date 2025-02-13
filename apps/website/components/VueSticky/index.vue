<script setup lang="ts">
import type { Subscription } from 'subscribe-ui-event'
import { subscribe } from 'subscribe-ui-event'
import { computed, onBeforeUnmount, onMounted, reactive, ref, useTemplateRef } from 'vue'

const props = defineProps<Props>() // constants
const STATUS_ORIGINAL = 0 // The default status, locating at the original position.
const STATUS_RELEASED = 1 // The released status, locating at somewhere on document but not default one.
const STATUS_FIXED = 2 // The sticky status, locating fixed to the top or the bottom of screen.

let TRANSFORM_PROP = 'transform'

// global variable for all instances
let doc: Document
let docBody: HTMLElement
let docEl: HTMLElement
let canEnableTransforms = true // Use transform by default, so no Sticky on lower-end browser when no Modernizr
let M: any
let scrollDelta = 0
let win: Window
let winHeight = -1

enum StatusCode {
  /** The default status, located at the original position. */
  STATUS_ORIGINAL = 0,

  /**
   * The released status, located at somewhere on document, but not
   * default one.
   */
  STATUS_RELEASED = 1,
  STATUS_FIXED = 2,
}

interface Status {
  status: StatusCode
}

export interface Props {
  /** The switch to enable or disable Sticky (true by default ). */
  enabled?: boolean | undefined

  /**
   * The offset from the top of window where the top of the element will
   * be when sticky state is triggered(0 by default ). If it is a selector
   * to a target (via `querySelector()`), the offset will be the height of
   * the target.
   */
  top?: number | string | undefined

  /**
   * The offset from the top of document which release state will be
   * triggered when the bottom of the element reaches at. If it is a
   * selector to a target (via `querySelector()`), the offset will be the
   * bottom of the target.
   */
  bottomBoundary?: number | string | undefined

  /** z-index of the sticky */
  innerZ?: number | string | undefined

  /** Enable the use of CSS3 transforms (`true` by default). */
  enableTransforms?: boolean | undefined

  /**
   * Class name to be applied to the element when the sticky state is
   * active ('active' by default).
   */
  activeClass?: string | undefined

  /**
   * Class name to be applied to the inner element ('' by default).
   */
  innerClass?: string | undefined

  /**
   * Class name to be applied to the inner element when the sticky
   * state is active ('' by default).
   */
  innerActiveClass?: string | undefined

  /**
   * Class name to be applied to the element independent of the
   * sticky state.
   */
  className?: string | undefined

  /**
   * Class name to be applied to the element when the sticky state is
   * released ('released' by default).
   */
  releasedClass?: string | undefined

  /** Callback for when the sticky state changes. */
  onStateChange?: ((status: Status) => void) | undefined

  /**
   * Callback to indicate when the sticky plugin should freeze position
   * and ignore scroll/resize events.
   */
  shouldFreeze?: (() => boolean) | undefined

}

const outerElement = useTemplateRef('outerElement')
const innerElement = useTemplateRef('innerElement')
const deltaNum = ref(0)
const stickyTop = ref(0)
const stickyBottom = ref(0)
const frozen = ref(false)
const skipNextScrollEvent = ref(false)
const scrollTop = ref(-1)
const bottomBoundaryTarget = ref(null)
const topTarget = ref(null)
const subscribers = ref<Subscription[]>([])
const state = reactive({
  top: 0, // A top offset from viewport top where Sticky sticks to when scrolling up
  bottom: 0, // A bottom offset from viewport top where Sticky sticks to when scrolling down
  width: 0, // Sticky width
  height: 0, // Sticky height
  x: 0, // The original x of Sticky
  y: 0, // The original y of Sticky
  topBoundary: 0, // The top boundary on document
  bottomBoundary: Infinity, // The bottom boundary on document
  status: STATUS_ORIGINAL, // The Sticky status
  pos: 0, // Real y-axis offset for rendering position-fixed and position-relative
  activated: false, // once browser info is available after mounted, it becomes true to avoid checksum error
})

function getTargetHeight(target: HTMLElement | null) {
  return (target && target.offsetHeight) || 0
}

function getTopPosition(top: number | string | undefined) {
  // a top argument can be provided to override reading from the props
  top = top || props.top || 0
  if (typeof top === 'string') {
    if (!topTarget.value) {
      topTarget.value = doc.querySelector(top)
    }
    top = getTargetHeight(topTarget.value)
  }
  return top
}

function getTargetBottom(target: HTMLElement | null) {
  if (!target) {
    return -1
  }
  const rect = target.getBoundingClientRect()
  return scrollTop.value + rect.bottom
}

function getBottomBoundary(bottomBoundary?: string | number | { value: number, target: string }) {
  // a bottomBoundary can be provided to avoid reading from the props
  let boundary = bottomBoundary || props.bottomBoundary

  // TODO, bottomBoundary was an object, depricate it later.
  if (typeof boundary === 'object') {
    boundary = boundary.value || boundary.target || 0
  }

  if (typeof boundary === 'string') {
    if (!bottomBoundaryTarget.value) {
      bottomBoundaryTarget.value = doc.querySelector(boundary)
    }
    boundary = getTargetBottom(bottomBoundaryTarget.value)
  }
  return boundary && boundary > 0 ? boundary : Infinity
}

function reset() {
  state.status = STATUS_ORIGINAL
  state.pos = 0
}

function release(pos: number) {
  state.status = STATUS_RELEASED
  state.pos = pos - state.y
}

function fix(pos: number) {
  state.status = STATUS_FIXED
  state.pos = pos
}

function updateInitialDimension(options?: any) {
  options = options || {}

  if (!outerElement.value || !innerElement.value) {
    return
  }

  const outerRect = outerElement.value.getBoundingClientRect()
  const innerRect = innerElement.value.getBoundingClientRect()

  const width = outerRect.width || outerRect.right - outerRect.left
  const height = innerRect.height || innerRect.bottom - innerRect.top
  const outerY = outerRect.top + scrollTop.value

  state.top = getTopPosition(options.top)
  state.bottom = Math.min(state.top + height, winHeight)
  state.width = width
  state.height = height
  state.x = outerRect.left
  state.y = outerY
  state.bottomBoundary = getBottomBoundary(options.bottomBoundary)
  state.topBoundary = outerY
}

function handleResize(_e: Event, ae: any) {
  if (props.shouldFreeze?.()) {
    return
  }

  winHeight = ae.resize.height
  updateInitialDimension()
  update()
}

function handleScrollStart(_e: Event, ae: any) {
  frozen.value = props.shouldFreeze()

  if (frozen.value) {
    return
  }

  if (scrollTop.value === ae.scroll.top) {
    // Scroll position hasn't changed,
    // do nothing
    skipNextScrollEvent.value = true
  }
  else {
    scrollTop.value = ae.scroll.top
    updateInitialDimension()
  }
}

function handleScroll(_e: Event, ae: any) {
  // Scroll doesn't need to be handled
  if (skipNextScrollEvent.value) {
    skipNextScrollEvent.value = false
    return
  }

  scrollDelta = ae.scroll.delta
  scrollTop.value = ae.scroll.top
  update()
}

function update() {
  const disabled
    = !props.enabled
      || state.bottomBoundary - state.topBoundary
      <= state.height
      || (state.width === 0 && state.height === 0)

  if (disabled) {
    if (state.status !== STATUS_ORIGINAL) {
      reset()
    }
    return
  }

  const delta = scrollDelta
  // "top" and "bottom" are the positions that state.top and state.bottom project
  // on document from viewport.
  const top = scrollTop.value + state.top
  const bottom = scrollTop.value + state.bottom

  // There are 2 principles to make sure Sticky won't get wrong so much:
  // 1. Reset Sticky to the original postion when "top" <= topBoundary
  // 2. Release Sticky to the bottom boundary when "bottom" >= bottomBoundary
  if (top <= state.topBoundary) {
    // #1
    reset()
  }
  else if (bottom >= state.bottomBoundary) {
    // #2
    stickyBottom.value = state.bottomBoundary
    stickyTop.value = stickyBottom.value - state.height
    release(stickyTop.value)
  }
  else {
    if (state.height > winHeight - state.top) {
      // In this case, Sticky is higher then viewport minus top offset
      switch (state.status) {
        case STATUS_ORIGINAL:
          release(state.y)
          stickyTop.value = state.y
          stickyBottom.value = stickyTop.value + state.height
        // Commentting out "break" is on purpose, because there is a chance to transit to FIXED
        // from ORIGINAL when calling window.scrollTo().
        // break;
        /* eslint-disable-next-line no-fallthrough */
        case STATUS_RELEASED:
          // If "top" and "bottom" are inbetween stickyTop and stickyBottom, then Sticky is in
          // RELEASE status. Otherwise, it changes to FIXED status, and its bottom sticks to
          // viewport bottom when scrolling down, or its top sticks to viewport top when scrolling up.
          stickyBottom.value = stickyTop.value + state.height
          if (delta > 0 && bottom > stickyBottom.value) {
            fix(state.bottom - state.height)
          }
          else if (delta < 0 && top < stickyTop.value) {
            fix(state.top)
          }
          break
        case STATUS_FIXED: {
          let toRelease = true
          const pos = state.pos
          const height = state.height
          // In regular cases, when Sticky is in FIXED status,
          // 1. it's top will stick to the screen top,
          // 2. it's bottom will stick to the screen bottom,
          // 3. if not the cases above, then it's height gets changed
          if (delta > 0 && pos === state.top) {
            // case 1, and scrolling down
            stickyTop.value = top - delta
            stickyBottom.value = stickyTop.value + height
          }
          else if (
            delta < 0
            && pos === state.bottom - height
          ) {
            // case 2, and scrolling up
            stickyBottom.value = bottom - delta
            stickyTop.value = stickyBottom.value - height
          }
          else if (
            pos !== state.bottom - height
            && pos !== state.top
          ) {
            // case 3
            // This case only happens when Sticky's bottom sticks to the screen bottom and
            // its height gets changed. Sticky should be in RELEASE status and update its
            // sticky bottom by calculating how much height it changed.
            const deltaHeight
              = pos + height - state.bottom
            stickyBottom.value = bottom - delta + deltaHeight
            stickyTop.value = stickyBottom.value - height
          }
          else {
            toRelease = false
          }

          if (toRelease) {
            release(stickyTop.value)
          }
          break
        }
      }
    }
    else {
      // In this case, Sticky is shorter then viewport minus top offset
      // and will always fix to the top offset of viewport
      fix(state.top)
    }
  }
  deltaNum.value = delta
}

onMounted(() => {
  if (!win) {
    win = window
    doc = document
    docEl = doc.documentElement
    docBody = doc.body
    winHeight = win.innerHeight || docEl.clientHeight
    // @ts-ignore
    M = window.Modernizr
    // No Sticky on lower-end browser when no Modernizr
    if (M && M.prefixed) {
      canEnableTransforms = M.csstransforms3d
      TRANSFORM_PROP = M.prefixed('transform')
    }
  }

  // when mount, the scrollTop is not necessary on the top
  scrollTop.value = docBody.scrollTop + docEl.scrollTop

  if (props.enabled) {
    state.activated = true
    updateInitialDimension()
    update()
  }
  // bind the listeners regardless if initially enabled - allows the component to toggle sticky functionality
  subscribers.value = [
    subscribe('scrollStart', handleScrollStart, {
      useRAF: true,
    }),
    subscribe('scroll', handleScroll, {
      useRAF: true,
      enableScrollInfo: true,
    }),
    subscribe('resize', handleResize, {
      enableResizeInfo: true,
    }),
  ]
})

onBeforeUnmount(() => {
  const subs = subscribers.value || []
  for (let i = subs.length - 1; i >= 0; i--) {
    subs[i].unsubscribe()
  }
})

function translate(style: Record<string, any>, pos: number) {
  const enableTransforms
    = canEnableTransforms && props.enableTransforms
  if (enableTransforms && state.activated) {
    style[TRANSFORM_PROP]
      = `translate3d(0,${Math.round(pos)}px,0)`
  }
  else {
    style.top = `${pos}px`
  }
}

const innerStyle = computed(() => {
  const style: Record<string, any> = {
    position: state.status === STATUS_FIXED ? 'fixed' : 'relative',
    top: state.status === STATUS_FIXED ? '0px' : '',
    zIndex: props.innerZ,
  }
  if (state.status !== STATUS_ORIGINAL) {
    style.width = `${state.width}px`
  }

  return style
})

const outerStyle = computed(() => {
  if (state.status !== STATUS_ORIGINAL) {
    return {
      height: `${state.height}px`,
    }
  }
  return {

  }
})
translate(innerStyle.value, state.pos)

const outerClasses = computed(() => {
  return [
    'sticky-outer-wrapper',
    props.className,
    state.status === STATUS_FIXED ? props.activeClass : undefined,
    state.status === STATUS_RELEASED ? props.releasedClass : undefined,
  ]
})

const innerClasses = computed(() => {
  return [
    'sticky-inner-wrapper',
    props.innerClass,
    state.status === STATUS_FIXED ? props.innerActiveClass : undefined,
  ]
})
</script>

<template>
  <div ref="outerElement" :class="outerClasses" :style="outerStyle">
    <div ref="innerElement" :class="innerClasses" :style="innerStyle">
      <slot />
    </div>
  </div>
</template>

<style scoped></style>
