import { VNode, VNodeDirective } from "vue";

export default {
  bind(el: any, binding: VNodeDirective) {
    // 用来确定点击是否在内部，
    function isIn(e:any,outsideNode:string):boolean{
      let selfNode = e.target;
      let parentNode = e.target.parentNode;
      while (parentNode.id!=='app') {
        // 判断点击目标是不是目标节点的子节点
        if(parentNode.className!==outsideNode){
          // 不是就继续检测父亲节点
          parentNode = parentNode.parentNode;
        } else { 
          // 是就返回true
          return true;
        }
      }
      // 检测点击的节点不是目标节点的子节点
      return false;
    }
    function clickHandler(e: any) {
      let outsideNode: string = el.className;
      // 点击在目标区域内
      // console.log(e);
      if (isIn(e,outsideNode)) {
        return;
      }
      // 点在区域外 执行hideTooltip
      binding.value(el);
      el.__VueClickOut__ = clickHandler;
    }
    document.addEventListener("touchstart", clickHandler);
  },
  update(el: HTMLElement, binding: VNodeDirective) {},
  unbind(el: any, binding: VNodeDirective) {
    document.removeEventListener("touchstart", el.__VueClickOut__);
    delete el.__VueClickOut__;
  }
};
