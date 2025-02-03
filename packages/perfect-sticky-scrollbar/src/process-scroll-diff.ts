import type { RequiredPerfectScrollbar } from './types'
import { setScrollingClassInstantly } from './lib/class-names'

function createEvent(name: string) {
  if (typeof window.CustomEvent === 'function') {
    return new CustomEvent(name)
  }

  const evt = document.createEvent('CustomEvent')
  evt.initCustomEvent(name, false, false, undefined)
  return evt
}

type Fields = [
  'contentHeight' | 'contentWidth',
  'containerHeight' | 'containerWidth',
  'scrollTop' | 'scrollLeft',
  'x' | 'y',
  'up' | 'left',
  'right' | 'down',
]

export default function (
  i: RequiredPerfectScrollbar,
  axis: string,
  diff: number,
  useScrollingClass = true,
  forceFireReachEvent = false,
) {
  let fields: Fields
  if (axis === 'top') {
    fields = [
      'contentHeight',
      'containerHeight',
      'scrollTop',
      'y',
      'up',
      'down',
    ] as const
  }
  else if (axis === 'left') {
    fields = [
      'contentWidth',
      'containerWidth',
      'scrollLeft',
      'x',
      'left',
      'right',
    ] as const
  }
  else {
    throw new Error('A proper axis should be provided')
  }

  processScrollDiff(i, diff, fields, useScrollingClass, forceFireReachEvent)
}

function processScrollDiff(
  i: RequiredPerfectScrollbar,
  diff: number,
  [contentHeight, containerHeight, scrollTop, y, up, down]: Fields,
  useScrollingClass = true,
  forceFireReachEvent = false,
) {
  const element = i.element

  // reset reach
  i.reach[y] = null

  // 1 for subpixel rounding
  if (element[scrollTop] < 1) {
    i.reach[y] = 'start'
  }

  // 1 for subpixel rounding
  if (element[scrollTop] > i[contentHeight] - i[containerHeight] - 1) {
    i.reach[y] = 'end'
  }

  if (diff) {
    element.dispatchEvent(createEvent(`ps-scroll-${y}`))

    if (diff < 0) {
      element.dispatchEvent(createEvent(`ps-scroll-${up}`))
    }
    else if (diff > 0) {
      element.dispatchEvent(createEvent(`ps-scroll-${down}`))
    }

    if (useScrollingClass) {
      setScrollingClassInstantly(i, y)
    }
  }

  if (i.reach[y] && (diff || forceFireReachEvent)) {
    element.dispatchEvent(createEvent(`ps-${y}-reach-${i.reach[y]}`))
  }
}
