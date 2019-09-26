import Vue from "vue";
import App from "./App.vue";
// @ts-ignore
// import lib from "../dist/vuedash.umd.js";
// import "../dist/vuedash.css";
import lib from "./components/index";

Vue.use(lib);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount("#app");
