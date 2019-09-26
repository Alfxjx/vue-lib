<template>
  <div class="tip-wrap" v-clickOut="hideTooltip" @click="getClickPosition" id="tipWrap">
    <div class="tip-ref" ref="tipClick" id="tipClick" >
      <slot></slot>
    </div>
    <div
      v-show="show"
      ref="tips"
      class="tip-content"
      :class="{'too-low':isTooLow}"
      :style="{'right':ctxPosRight, 'left': ctxPosLeft,'top':ctxPosTop}"
    >
      <!-- 上方的三角符号 -->
      <div class="tip-content-triangle-left" v-show="isLeft" :style="{'left':leftTriangle2border}"></div>
      <div
        class="tip-content-triangle-right"
        v-show="isLeft"
        :style="{'left':rightTriangle2border}"
      ></div>
      <div
        class="tip-content-triangle-left"
        v-show="!isLeft"
        :style="{'right':leftTriangle2border}"
      ></div>
      <div
        class="tip-content-triangle-right"
        v-show="!isLeft"
        :style="{'right':rightTriangle2border}"
      ></div>
      <div class="tip-content-text" :class="{'too-low-text':isTooLow}">
        <span>{{context}}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import clickOut from "./clickOut";

Vue.directive("clickOut", clickOut);
// import Emitter from '../../mixins/emitter.vue';
@Component
export default class Tooltip extends Vue {
  // 是否展示
  @Prop() show!: boolean;
  // 提示的内容
  @Prop() context!: string;
  // 手动翻转
  @Prop() reverse?: boolean;

  // 判断点击位置与axis的距离
  toTop: number = 0;
  toLeft: number = 0;
  // slot 距离顶部的距离
  tipHeight: number = 0;
  // 插槽的高度
  slotHeight: number = 0;
  // 屏幕尺寸
  screenWidth: number = 0;
  screenHeight: number = 0;
  // 左三角挂载位置
  leftTriangle2border: string = "";
  // 右三角挂载位置
  rightTriangle2border: string = "";
  // 是否点击在左侧
  isLeft: boolean = true;
  // 是否太低
  isTooLow: boolean = false;

  mounted() {
    this.screenWidth = window.screen.width;
    this.screenHeight = window.screen.height;
  }

  // 弹窗的高度
  get tipsContentHeight(): number {
    let width;
    this.isLeft
      ? (width = this.screenWidth - this.toLeft - 6)
      : (width = this.toLeft);
    let lines = Math.floor((this.context.length * 12) / width) + 1;
    // 按照标准，设计字号12px,行高17px.
    // 上下留18px padding。
    return lines * 17 + 36;
  }
  // 对话框位置
  get ctxPosRight(): string {
    if (this.isLeft) {
      return "auto";
    } else {
      let res =
        this.screenWidth - this.toLeft - 25 > 0
          ? this.screenWidth - this.toLeft - 25
          : 0;
      return res.toString() + "px";
    }
  }
  get ctxPosLeft(): string {
    if (this.isLeft) {
      let res = this.toLeft - 25 > 0 ? this.toLeft - 25 : 0;
      return res.toString() + "px";
    } else {
      return "auto";
    }
  }
  get ctxPosTop(): string {
    // 声明翻转
    if (this.reverse) {
      return -1 * (this.tipsContentHeight - 8) + `px`;
    }
    // 计算出翻转
    if (this.isTooLow) {
      return -1 * (this.tipsContentHeight - 8) + `px`;
    } else {
      // slot高度+8px高度的空隙
      return `calc(100% + 8px)`;
    }
  }

  hideTooltip(el: any): void {
    this.$emit("update:show", false);
  }

  getClickPosition(e: any) {
    // console.log(this.ctxPosTop);
    // console.log(e);
    this.toTop = e.pageY;
    // console.log("toTop" + this.toTop);
    this.toLeft = e.pageX;
    let middleLine: number = this.screenWidth / 2;
    console.log(middleLine);
    
    if (this.toLeft < middleLine) {
      this.isLeft = true;
      this.leftTriangle2border = "15px";
      this.rightTriangle2border = "22.5px";
    } else {
      this.isLeft = false;
      this.rightTriangle2border = "15px";
      this.leftTriangle2border = "22.5px";
    }
    let el = document.getElementById("tipClick");
    let tipWrap = document.getElementById("tipWrap");
    console.log(el);
    console.log(tipWrap);
    if (el && tipWrap) {
      // slot 距离顶部的距离
      this.tipHeight = tipWrap.offsetTop;
      // console.log("tipsHeight" + this.tipHeight);
      // console.log("screenHeight" + this.screenHeight);
      this.slotHeight = el.clientHeight;
      // 如果太低 下方剩下的高度<本身加上40
      // console.log("自己加40" + (this.tipsContentHeight + 40));

      // console.log("tipsHeight" + this.tipHeight);
      // console.log("screenHeight" + this.screenHeight);
      // console.log("slotHeight" + this.slotHeight);
      // console.log(
      //   "下方剩下的高度" +
      //     (this.screenHeight - this.tipHeight - this.slotHeight)
      // );
      // 手动翻转，直接翻转
      if (this.reverse === true) {
        this.isTooLow = true;
        console.log(this.reverse + "&" + this.isTooLow);
      } else {
        // 否则 计算一下是不是需要翻转。
        this.screenHeight - this.tipHeight - this.slotHeight <
        this.tipsContentHeight + 40
          ? (this.isTooLow = true)
          : (this.isTooLow = false);
      }
    }

    // this.$nextTick(() => {
    //   setTimeout(() => {});
    // });
  }
}
</script>

<style scoped lang="scss">
$theme-tooltip-bgcolor: #24a0ff;
$theme-font-color: #fff;
.tip-wrap {
  display: flex;
  flex-direction: column;
  position: relative;
  .tip-content {
    position: absolute;
    z-index: 9999;
    // top: 28px;
    &.too-low {
      transform: rotateX(-180deg);
    }
    .tip-content-text {
      // right: 11px;
      // max-width: 95%;
      font-size: 12px;
      line-height: 14px;
      color: $theme-font-color;
      background-color: $theme-tooltip-bgcolor;
      padding: 14px 12px 14px 15px;
      margin: 0 5px;
      border-radius: 4px;
      z-index: 1;
      &.too-low-text {
        transform: rotateX(-180deg);
      }
    }
    .tip-content-triangle-left {
      content: "";
      position: absolute;
      // right: 27px;
      // 2*4-1 px
      top: -7px;
      // border: 8px solid;
      border-top: 4px solid;
      border-bottom: 4px solid;
      border-left: 3.75px solid;
      border-right: 3.75px solid;
      border-color: transparent $theme-tooltip-bgcolor $theme-tooltip-bgcolor
        transparent;
    }
    .tip-content-triangle-right {
      content: "";
      position: absolute;
      // right: 27px;
      // 2*4-1 px
      top: -7px;
      // border: 8px solid;
      border-top: 4px solid;
      border-bottom: 4px solid;
      border-left: 3.75px solid;
      border-right: 3.75px solid;
      border-color: transparent transparent $theme-tooltip-bgcolor
        $theme-tooltip-bgcolor;
    }
  }
}
</style>