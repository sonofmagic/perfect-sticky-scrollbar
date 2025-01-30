class EventElement {
  element: Element
  handlers: {
    [key: string]: Array<EventListener>
  }

  constructor(element: Element) {
    this.element = element
    this.handlers = {}
  }

  bind(eventName: string, handler: EventListener) {
    if (typeof this.handlers[eventName] === 'undefined') {
      this.handlers[eventName] = []
    }
    this.handlers[eventName].push(handler)
    this.element.addEventListener(eventName, handler, false)
  }

  unbind(eventName: string, target?: EventListener) {
    this.handlers[eventName] = this.handlers[eventName].filter((handler) => {
      if (target && handler !== target) {
        return true
      }
      this.element.removeEventListener(eventName, handler, false)
      return false
    })
  }

  unbindAll() {
    for (const name in this.handlers) {
      this.unbind(name)
    }
  }

  get isEmpty() {
    return Object.keys(this.handlers).every(
      key => this.handlers[key].length === 0,
    )
  }
}

export default class EventManager {
  eventElements: EventElement[]
  constructor() {
    this.eventElements = []
  }

  eventElement(element: Element) {
    let ee = this.eventElements.filter(ee => ee.element === element)[0]
    if (!ee) {
      ee = new EventElement(element)
      this.eventElements.push(ee)
    }
    return ee
  }

  bind(element: Element, eventName: string, handler: EventListener) {
    this.eventElement(element).bind(eventName, handler)
  }

  unbind(element: Element, eventName: string, handler: EventListener) {
    const ee = this.eventElement(element)
    ee.unbind(eventName, handler)

    if (ee.isEmpty) {
      // remove
      this.eventElements.splice(this.eventElements.indexOf(ee), 1)
    }
  }

  unbindAll() {
    this.eventElements.forEach(e => e.unbindAll())
    this.eventElements = []
  }

  once(element: Element, eventName: string, handler: EventListener) {
    const ee = this.eventElement(element)
    const onceHandler = (evt: Event) => {
      ee.unbind(eventName, onceHandler)
      handler(evt)
    }
    ee.bind(eventName, onceHandler)
  }
}
