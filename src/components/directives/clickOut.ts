import Vue, { VNode } from "vue";
import { isMobile } from "@/utils/tool";

export default {
  bind(el: any, binding: any, vnode: VNode) {
    function clickHandler(e: any) {
      // in
      if (
        el.compareDocumentPosition(e.target) & Node.DOCUMENT_POSITION_CONTAINS
      ) {
          // 点在区域外 执行hideTooltip
          binding.value(el);
          el.__VueClickOut__ = clickHandler;
        }
      // out
      if (
        el.compareDocumentPosition(e.target) &
        Node.DOCUMENT_POSITION_CONTAINED_BY
      ) {
        return;
      }
    }
    isMobile()
      ? document.addEventListener("touchstart", clickHandler)
      : document.addEventListener("click", clickHandler);
  },
  unbind(el: any) {
    isMobile()
      ? document.removeEventListener("touchstart", el.__VueClickOut__)
      : document.removeEventListener("click", el.__VueClickOut__);
    delete el.__VueClickOut__;
  },
};
