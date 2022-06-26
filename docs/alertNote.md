## Alert 组件开发

1. react-fast-marquee 文字横向轮播库
2. react-text-loop 文本上下滚动库

### HTML 属性分析

### 类型声明方面

1. 多个组件类型导出的合并方式 Menu 和 MenuItem, Alert 和 ErrorBoundary

   1. 需要创建一个合成组件的类型

      - 利用 & 符号，或者 extends 语法

      ```typescript
      import Alert from './Alert';
      import ErrorBoundary from './ErrorBoundary';

      type AlertType = typeof Alert;

      export interface CompoundAlertType extends AlertType {
        ErrorBoundary: typeof ErrorBoundary;
      }

      export type CompoundAlertType = AlertType & {
        ErrorBoundary: typeof ErrorBoundary;
      };
      ```

   2. 在 index.tsx 导出的时候，我们需要导出一个合成组件，而不是一个负责单独功能的组件

      - 利用 as 语法，强制赋值并导出

      ```typescript
      const CompoundAlert = Alert as CompoundAlertType;

      CompoundAlert.ErrorBoundary = ErrorBoundary;

      export default CompoundAlert;
      ```

### css 样式开发

1. 重置样式 + 自定义样式，减轻心智负担

- 重置样式：padding，margin，box-sizing，文字大小，行高
- font-variant: 也是多个属性的合成属性
- https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant
- font-variant-caps: 用来控制大写字母的图形
- font-variant-numeric: 用来控制数字的图形
- ....
- font-feature-settings: 用来控制 openType 字体的排版特性
- https://developer.mozilla.org/en-US/docs/Web/CSS/font-feature-settings
- https://10.1pxeye.com/font-feature-settings/

```less
.@{alert-prefix-cls} {
  // 设置一个通用的组件reset mixin
  .reset-component();
  // 设置一个组件基础的mixin
  .alert();
}

.reset-component() {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: @text-color;
  font-size: @font-size-base;
  font-variant: tabular-nums;
  line-height: @line-height-base;
  list-style: none;
  font-feature-settings: 'tnum';
}

// alert的基础属性
.alert() {
  position: relative;
  display: flex;
  align-items: center;
  padding: 8px 15px;
  word-wrap: break-word;
  border-radius: @border-radius-base;
}
```

2. antd 的 Icon 组件，都是一个 span + svg 进行实现的
3. 所有可点击的元素都可以看成是一个 button 元素，对一个可点击元素添加样式前，首先需要进行样式重置
   1. 我们都会考虑 border，outline 来清除边框效果 cursor:pointer 添加可点击标识 padding,margin 重置间隔
   2. 如果内容是文字，我们会考虑 white-space 文字换行，text-align 文字居中，inline-block 可以设置高度，height,line-height 进行居中,user-select 文本无法选中
   3. 如果内容是其他元素，例如 icon，我们会考虑 内容溢出 overflow:hidden
4. 样式颜色变会，能提到一个对比比较好的效果
   1. 次级颜色 fade(@black, 45%); hover 的时候加深一些 fade(@black, 75%);
5. 用来添加省略号的代码

   ```css
   .ellipsis {
     white-space: nowrap;
     overflow: hidden;
     text-overflow: ellipsis;
   }
   ```

6. overflow 和 white-space
   1. 在自适应布局的时候，如果屏幕太小，可能会导致文本内容自适应
   2. 利用 white-space:nowrap 和 overflow:hidden 可以形成一种比较自然的隐藏效果，不会造成视觉上布局混乱
7. 在添加动画的时候，由于 height:auto 不能添加动画效果，我们一般会使用 max-height 设置一个差不多的值

   ```less
   // 消失动画
   &-exit {
     opacity: 1;
     max-height: 200px;
     overflow: hidden;
   }
   &-exit-active {
     opacity: 0;
     max-height: 0;
     padding-top: 0;
     padding-bottom: 0;
     border-top: none;
     border-bottom: none;
     overflow: hidden;
     transition: all 300ms @ease-base-out;
   }
   &-exit-done {
     opacity: 0;
     max-height: 0;
     padding-top: 0;
     padding-bottom: 0;
     border-top: none;
     border-bottom: none;
     overflow: hidden;
   }
   ```
