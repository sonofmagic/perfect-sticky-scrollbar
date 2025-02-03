export function get(element: Element) {
  return getComputedStyle(element)
}

export function set(element: HTMLElement, obj: Partial<Record<string, string | number | undefined>>) {
  for (const key in obj as unknown as CSSStyleDeclaration) {
    let val = obj[key]
    if (typeof val === 'number') {
      val = `${val}px`
    }
    if (val !== undefined) {
      element.style[key] = val
    }
  }
  return element
}
