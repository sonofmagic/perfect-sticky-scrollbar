import type { Directive } from 'vue'
import { useStickyBox } from './use-sticky-box'

export const vTable: Directive<HTMLDivElement> = {
  mounted(el, _b) {
    const wrap: HTMLDivElement | null = el.querySelector('.el-scrollbar__bar.is-horizontal')

    if (wrap) {
      useStickyBox(wrap, { offsetTop: 0, bottom: true, offsetBottom: 0 })
    }
  },
  beforeUnmount(_e, _b) {

  },
}
