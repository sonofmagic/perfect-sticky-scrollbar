import type PerfectScrollbar from '..'

const cls = {
  main: 'ps',
  rtl: 'ps__rtl',
  element: {
    thumb: (x: string) => `ps__thumb-${x}`,
    rail: (x: string) => `ps__rail-${x}`,
    consuming: 'ps__child--consume',
  },
  state: {
    focus: 'ps--focus',
    clicking: 'ps--clicking',
    active: (x: string) => `ps--active-${x}`,
    scrolling: (x: string) => `ps--scrolling-${x}`,
  },
}

export default cls

/*
 * Helper methods
 */
const scrollingClassTimeout: { x?: number, y?: number } = { x: undefined, y: undefined }

export function addScrollingClass(i: PerfectScrollbar, x: 'x' | 'y') {
  const classList = i.element.classList
  const className = cls.state.scrolling(x)

  if (classList.contains(className)) {
    window.clearTimeout(scrollingClassTimeout[x])
  }
  else {
    classList.add(className)
  }
}

export function removeScrollingClass(i: PerfectScrollbar, x: 'x' | 'y') {
  scrollingClassTimeout[x] = window.setTimeout(
    () => i.isAlive && i.element.classList.remove(cls.state.scrolling(x)),
    i.settings.scrollingThreshold,
  )
}

export function setScrollingClassInstantly(i: PerfectScrollbar, x: 'x' | 'y') {
  addScrollingClass(i, x)
  removeScrollingClass(i, x)
}
