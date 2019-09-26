import Vue from "vue";
import { VueConstructor } from "vue/types";
import Tooltip from "./tooltip/index";
import Button from "./button/index";

declare global {
  interface Window {
    Vue?: VueConstructor;
  }
}

const components = [Tooltip, Button];

const install = (Vue: VueConstructor) => {
  components.forEach(Component => {
    Vue.component(`dash${Component.name}`, Component);
  });
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

// FIXME: cannot handle directives or mixins
export { install, Tooltip, Button };

// TODO: remeber to change name before publish
export default { install };
