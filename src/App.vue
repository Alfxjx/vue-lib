<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" width="50px" height="50px" />
    <tooltip :show.sync="showTip" context="放资金放金放资截止今日0情况" :reverse="false">
      <div class="tips-wrapper">
        <span @click="showTips" class="tip">资金放资金放资金放资金放资金放资金放资金放资金放资</span>
      </div>
    </tooltip>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Tooltip from "./components/tooltip/tooltip.vue";

@Component({
  components: {
    tooltip: Tooltip
  }
})
export default class App extends Vue {
  showTip: boolean = false;
  showTips() {
    this.showTip = !this.showTip;
  }
}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
</style>
