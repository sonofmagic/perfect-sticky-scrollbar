export function div(className: string) {
  const div = document.createElement('div')
  div.className = className
  return div
}

const elMatches
  = typeof Element !== 'undefined'
    && (Element.prototype.matches
      || Element.prototype.webkitMatchesSelector
      // @ts-ignore
      || Element.prototype.mozMatchesSelector
      // @ts-ignore
      || Element.prototype.msMatchesSelector)

export function matches(element: Element, query: string) {
  if (!elMatches) {
    throw new Error('No element matching method supported')
  }

  return elMatches.call(element, query)
}

export function remove(element: Element) {
  if (element.remove) {
    element.remove()
  }
  else if (element.parentNode) {
    element.parentNode.removeChild(element)
  }
}

export function queryChildren(element: Element, selector: string) {
  return Array.prototype.filter.call(element.children, child =>
    matches(child, selector))
}
