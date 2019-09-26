# Tooltip & v-clickOut

## Tooltip

### 需求

1. 点击外部关闭
2. 三角形气泡角对准点击位置
3. 以中间线为界，左侧向右生长，反之亦然；
4. 气泡与边界相聚 5px
5. 点击位置过低时，气泡展示在上方
6. 一个插槽来承担标识符等

### 实现

- 计算点击的位置，判断是在左边还是右边。
- 根据计算，设置三角的位置
- 自动换行，根据默认的12px字号以及17px行高计算气泡框的尺寸。
- 计算距离底部的长度，小于气泡高+40px就翻转到上面(或者是自己声明reverse=true).

## v-clickOut

实现了点击外部就关闭内部的自定义指令。

### 参数

1. binding 方法， 将 flag 置为非。

### 实现

- 根据自定义指令的绑定方式
- 在`bind`中，监听touchstart事件
- 判断点击位置是否在绑定的位置的内部，不在内部就执行传入的binding函数。
- 在`unbind`中，解绑事件

## 用法

```html
<tooltip
  :show.sync="show"
  context="放资金放金放资截止今日0情况"
  :reverse="true"
>
  <div class="tips-wrapper">
    <span @click="showTips" class="tip"
      >资金放资金放资金放资金放资金放资金放资金放资金放资</span
    >
  </div>
</tooltip>
```

```ts
export default class Tooltip extends Vue {
  show: boolean = false;
  showTips(): void {
    this.show = !this.show;
  }
}
```

## API

| 参数    | 说明               | 类型    | 可选值              | 默认值 | 备注                       |
| ------- | ------------------ | ------- | ------------------- | ------ | -------------------------- |
| show    | 必填，是否展示气泡 | boolean | true/false          | null   | 需要加上`.sync`            |
| context | 提示内容           | string  | 'this is a tooltip' | N/A    | N/A                        |
| reverse | 是否翻转气泡       | boolean | true, false         | false  | boolean 值绑定需要双向绑定 |

## 待优化

1. 目前只能点击第一次的时候确定位置
2. 一进入就显示存在 bug
3. 
