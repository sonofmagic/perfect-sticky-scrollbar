import type { RequiredPerfectScrollbar } from '@/types'
import cls, {
  addScrollingClass,
  removeScrollingClass,
} from '../lib/class-names'
import updateGeometry from '../update-geometry'

let activeSlider: 'scrollbarX' | 'scrollbarY' | null = null // Variable to track the currently active slider

type Fields = [
  'containerHeight' | 'containerWidth',
  'contentHeight' | 'contentWidth',
  'pageY' | 'pageX',
  'railYHeight' | 'railXWidth',
  'scrollbarY' | 'scrollbarX',
  'scrollbarYHeight' | 'scrollbarXWidth',
  'scrollTop' | 'scrollLeft',
  'y' | 'x',
  'scrollbarYRail' | 'scrollbarXRail',
]

export default function setupScrollHandlers(i: RequiredPerfectScrollbar) {
  bindMouseScrollHandler(i, [
    'containerHeight',
    'contentHeight',
    'pageY',
    'railYHeight',
    'scrollbarY',
    'scrollbarYHeight',
    'scrollTop',
    'y',
    'scrollbarYRail',
  ])

  bindMouseScrollHandler(i, [
    'containerWidth',
    'contentWidth',
    'pageX',
    'railXWidth',
    'scrollbarX',
    'scrollbarXWidth',
    'scrollLeft',
    'x',
    'scrollbarXRail',
  ])
}

function bindMouseScrollHandler(
  i: RequiredPerfectScrollbar,
  [
    containerDimension,
    contentDimension,
    pageAxis,
    railDimension,
    scrollbarAxis,
    scrollbarDimension,
    scrollAxis,
    axis,
    scrollbarRail,
  ]: Fields,
) {
  const element = i.element
  let startingScrollPosition = null
  let startingMousePagePosition = null
  let scrollBy = null

  function moveHandler(e) {
    if (e.touches && e.touches[0]) {
      e[pageAxis] = e.touches[0][`page${axis.toUpperCase()}`]
    }

    // Only move if the active slider is the one we started with
    if (activeSlider === scrollbarAxis) {
      element[scrollAxis]
        = startingScrollPosition
          + scrollBy * (e[pageAxis] - startingMousePagePosition)
      addScrollingClass(i, axis)
      updateGeometry(i)

      e.stopPropagation()
      e.preventDefault()
    }
  }

  function endHandler() {
    removeScrollingClass(i, axis)
    i[scrollbarRail].classList.remove(cls.state.clicking)
    document.removeEventListener('mousemove', moveHandler)
    document.removeEventListener('mouseup', endHandler)
    document.removeEventListener('touchmove', moveHandler)
    document.removeEventListener('touchend', endHandler)
    activeSlider = null // Reset active slider when interaction ends
  }

  function bindMoves(e: Event) {
    if (activeSlider === null) {
      // Only bind if no slider is currently active
      activeSlider = scrollbarAxis // Set current slider as active

      startingScrollPosition = element[scrollAxis]
      if (e.touches) {
        e[pageAxis] = e.touches[0][`page${axis.toUpperCase()}`]
      }
      startingMousePagePosition = e[pageAxis]
      scrollBy
        = (i[contentDimension] - i[containerDimension])
          / (i[railDimension] - i[scrollbarDimension])

      if (!e.touches) {
        document.addEventListener('mousemove', moveHandler)
        document.addEventListener('mouseup', endHandler)
      }
      else {
        document.addEventListener('touchmove', moveHandler, { passive: false })
        document.addEventListener('touchend', endHandler)
      }

      i[scrollbarRail].classList.add(cls.state.clicking)
    }

    e.stopPropagation()
    if (e.cancelable) {
      e.preventDefault()
    }
  }

  i[scrollbarAxis].addEventListener('mousedown', bindMoves)
  i[scrollbarAxis].addEventListener('touchstart', bindMoves)
}
