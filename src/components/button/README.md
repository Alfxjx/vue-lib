# Button 组件 API

## 使用

```ts
import Button from '@/plugin/components/Button.vue';
@Component({
  'dash-button': Button
})
```

在页面里面:

```html
<dash-button context="完成" @change="someHandlers"> </dash-button>
<dash-button @change="someHandlers">
  <b>可以使用slots,会覆盖context</b>
</dash-button>
<dash-button
  type="plain"
  size="large"
  width="20px"
  height="10%"
  round="playground"
  :disabled="isDisabled"
  context="暴露一个点击事件"
  @change="someHandlers"
>
</dash-button>
```

## API

| Api          | type     | 说明                    | 参考值                  |
| ------------ | -------- | ----------------------- | ----------------------- |
| type         | string   | 按钮的类型,默认 primary | primary,plain,text,grey |
| size         | string   | 按钮的尺寸,默认 mid     | large,mid,small         |
| width,height | string   | 设置尺寸，会覆盖 size   | 20px, 20%               |
| radius       | string   | 圆角,默认 normal 4px    | normal,playground       |
| disabled     | boolean  | 是否不可点击            | true/flase              |
| change       | function | 绑定的点击事件。        | 自己设定                |
