import type { Directive } from 'vue'
import PerfectScrollbar from 'perfect-sticky-scrollbar'
import 'perfect-sticky-scrollbar/style.css'

const psWeakMap = new WeakMap<WeakKey, PerfectScrollbar>()

export const vTable: Directive<HTMLDivElement> = {
  mounted(el, _b, vnode) {
    const wrap: HTMLDivElement | null = el.querySelector('.el-scrollbar__wrap')

    if (wrap) {
      wrap.style.position = 'relative'
      const ps = new PerfectScrollbar(wrap, {
        stickyXScrollbar: true,
        stickyXScrollbarOffset: 4,
      })
      psWeakMap.set(vnode, ps)
    }
  },
  beforeUnmount(_e, _b, vnode) {
    const ps = psWeakMap.get(vnode)
    if (ps) {
      ps.destroy()
      psWeakMap.delete(vnode)
    }
  },
}
