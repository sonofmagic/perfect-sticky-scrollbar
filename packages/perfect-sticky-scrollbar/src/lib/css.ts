export function get(element: Element) {
  return getComputedStyle(element)
}

export function set(element: HTMLElement, obj: CSSStyleDeclaration) {
  for (const key in obj) {
    let val = obj[key]
    if (typeof val === 'number') {
      val = `${val}px`
    }
    element.style[key] = val
  }
  return element
}
