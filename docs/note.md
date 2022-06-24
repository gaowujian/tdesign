## button 组件开发

- 实现了 ref 组件的透传和熟悉相关 react 类型的使用
- 在属性暴露方面，目前是暴露了所有原生+ 支持的属性，但是在实现上，只对显示声明的自定义属性进行了逻辑的支持

### 类型声明方面

- 利用 react 提供的原生组件的完备类型提升开发体验
  - 当和自定义属性发生冲突的时候，需要进行相应的 omit 处理
  - 例如自定义支持的是 default,primary 等，但是 button 元素默认提供的类型是 'submit' | 'reset' | 'button' | undefined;

```
type NativeButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  keyof AriaAttributes | 'type'
>;
```

- 利用自定义属性提供组件可支持的属性和事件
- 在做类型推断的时候，如果类型是 A & B, 那么我们赋值的时候可以有良好的提示，本质是类型分发；但是在解构赋值的的时候，我们只能解构公有的属性

  - 通过 discriminated union，也就是 if 语句可以识别出具体的类型，

  ```typescript
  if (props.type === 'link') {
  }
  ```

  - 不过 不能使用 else 进行推断，常用 as 语法，进行认为的类型确定

  ```typescript
  if (props.type === 'link') {
    return;
  }
  //这里没有类型推断功能
  props as NativeButtonProps;
  ```

### css 样式开发

- user-select: 元素内容是否能够选中
- https://developer.mozilla.org/en-US/docs/Web/CSS/user-select
- focus 是否需要保持 hover 状态的样式也是可以商榷修改的
- 样式处理顺序
- 默认样式 => focus 和 hover 状态 => active 状态 => disabled 状态

```less
.btn-variant(@color; @background; @border) {
  // 默认颜色
  .button-color(@color, @background, @border);

  // hover和focus的时候，字体颜色边框颜色会变，背景颜色不变
  &:hover,
  &:focus {
    .button-color(
      ~`colorPalette('@{btn-primary-bg}', 5) `; @background;
        ~`colorPalette('@{btn-primary-bg}', 5) `
    );
  }
  // active的时候加深颜色
  &:active {
    .button-color(
      ~`colorPalette('@{btn-primary-bg}', 7) `; @background;
        ~`colorPalette('@{btn-primary-bg}', 7) `
    );
  }
}
```

- 每个组件的样式会包含在一个 特定的 命名空间下，可以有效防止样式冲突

```less
@btn-prefix-cls: ~"@{ant-prefix}-btn";   // tdesign-btn

.@{btn-prefix-cls}{
  // 默认布局mixin
  .btn();
  // 默认的时候会添加一个色彩的class
  &-default{
    // 默认颜色mixin
  .btn-default();
  }
  &-primary{
    // primary颜色mixin
    .btn-primary()
  }
}
```
