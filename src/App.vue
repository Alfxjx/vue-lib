<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" width="50px" height="50px" />
    <dash-tooltip :show.sync="showTip" context="放资金放金放资截止今日0情况" :reverse="false">
      <div class="tips-wrapper">
        <span @click="showTips" class="tip">资金放资金放资金放资金放资金放资金放资金放资金放资</span>
      </div>
    </dash-tooltip>
    <dash-button type="primary" size="small" width="100px">
      button
    </dash-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
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
