<template>
  <div
    class="self-button"
    :class="[btnType,btnSize,btnRound,{'btn-disabled': disabled}]"
    :style="{width:width,height:height}"
    @click="btnClick"
    id="btnWrapper"
  >
    <div
      class="btn-inside"
      :style="{fontSize:computedFontSize}"
      :class="[btnTypeColor,{'btn-text-disabled':disabled}]"
    >
      <slot v-if="$slots.default"></slot>
      <span v-else>{{context}}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
@Component
export default class Button extends Vue {
  // large mid small
  @Prop({ default: "mid" }) size?: string;
  // 设置宽高（在默认不满足时使用）
  @Prop() width?: string;
  @Prop() height?: string;
  // normal round playground 圆角
  @Prop({ default: "normal" }) round?: string;
  // 按钮内容
  @Prop() context?: string | number;
  // primary plain text grey 按钮类型
  @Prop({ default: "primary" }) type?: string;
  // 是否不可点击
  @Prop({ default: false }) disabled?: boolean;

  @Emit("change") btnClick() {
    // placeholder
  }

  mounted() {
    // plain 圆角 覆盖一下伪类
    if (this.type === "plain") {
      this._setPlainBorderRadius();
    }

    // playground 设置playground类型的圆角，不再考虑type=== plain的情况了
    if (this.round === "playground" && this.type !== "plain") {
      this._setPlayGround();
    }
  }

  private _setPlainBorderRadius(): void {
    const style = document.createElement("style");
    let CSS!: Text;
    switch (this.round) {
      // 由于操作的是伪类，需要单独拿出来讨论一下
      case "playground":
        const dom = document.querySelector("#btnWrapper") as HTMLElement;
        let radius!: number;
        if (dom !== null) {
          radius = dom.offsetHeight;
        }
        CSS = document.createTextNode(
          `#btnWrapper::after{border-radius:${radius}px;}`
        );
        break;
      // 默认是normal 就设置8px(一般外面设置的是4px的时候，设置为@2x)
      default:
        // 使用了scss mixin, 注释掉
        // CSS = document.createTextNode("#btnWrapper::after{border-radius:8px;}");
        break;
    }
    style.appendChild(CSS);
    document.body.appendChild(style);
  }
  // 设置圆角图标的圆角（根据按钮的高度）
  private _setPlayGround(): void {
    const dom = document.querySelector("#btnWrapper") as HTMLElement;
    if (dom !== null) {
      const height = dom.offsetHeight;
      dom.style.borderRadius = `${Number(height) / 2}px`;
    }
  }

  get btnType(): string {
    return `btn-type-${this.type}`;
  }
  get btnSize(): string {
    return `btn-size-${this.size}`;
  }
  get btnRound(): string {
    return `btn-round-${this.round}`;
  }
  get btnTypeColor(): string {
    return `btn-type-color-${this.type}`;
  }
  get computedFontSize(): string {
    switch (this.size) {
      case "large":
        return "16px";
        break;
      case "mid":
        return "16px";
        break;
      case "small":
        return "14px";
        break;
      default:
        return "14px";
        break;
    }
  }
}
</script>

<style scoped lang="scss">
$btn-theme-color: #3f69f2;
$theme-grey-background: #f0f1f5;
$theme-grey-text: #afb0b3;
.self-button {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 46px;
  &.btn-size-large {
    width: 92%;
    min-width: 345px;
  }
  &.btn-size-mid {
    width: 53%;
    min-width: 200px;
  }
  &.btn-size-small {
    width: 20%;
    min-width: 76px;
    height: 30px;
  }
  &.btn-type-primary {
    background: $btn-theme-color 100%;
  }
  &.btn-type-plain {
    background-color: #fff;
    // border: 1px solid #3f69f2;
    position: relative;
    // @include onepx($btn-theme-color, all, 4px, solid); // 一像素边框
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      border: 1px solid $btn-theme-color;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      width: 200%;
      height: 200%;
      -webkit-transform: scale(0.5);
      transform: scale(0.5);
      -webkit-transform-origin: left top;
      transform-origin: left top;
    }
  }
  &.btn-type-text {
    background: transparent;
  }
  &.btn-type-grey {
    background: $theme-grey-background;
  }
  &.btn-round-normal {
    border-radius: 4px;
  }
  &.btn-disabled {
    opacity: 0.6;
    pointer-events: none;
  }
  .btn-inside {
    width: 100%;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    letter-spacing: 0.18px;
    text-align: center;
    &.btn-type-color-primary {
      color: #fff;
    }
    &.btn-type-color-plain {
      color: $btn-theme-color;
    }
    &.btn-type-color-text {
      color: $btn-theme-color;
    }
    &.btn-type-color-grey {
      color: $theme-grey-text;
    }
  }
}
</style>