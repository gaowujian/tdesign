## Alert 组件开发

### react tsx 写法技巧

1. react-fast-marquee 文字横向轮播库
2. react-text-loop 文本上下滚动库
3. 支持传入任意类型的 icon，并统一添加一个 xx-icon 类名，方便统一样式管理

   ```typescript
   const IconNode: React.FC<IconNodeProps> = (props) => {
     const { description, icon, prefixCls, type } = props;
     const iconType = (description ? iconMapOutlined : iconMapFilled)[type!] || null;
     if (icon) {
       // 如果icon是非法组件，那么我们自己利用span创建一个合法组件，并把icon放进去
       // 如果icon是合法组件，那么就利用cloneElement劫持一个react 元素，并修改属性
       if (!React.isValidElement(icon)) return <span className={`${prefixCls}-icon`}>{icon}</span>;
       const generateProps = (props: any) => {
         return {
           className: classNames(`${prefixCls}-icon`, {
             [props.className]: props.className,
           }),
         };
       };
       const newProps = generateProps(icon.props);
       return React.cloneElement(icon, newProps);
     }
     return React.createElement(iconType, { className: `${prefixCls}-icon` });
   };
   ```

4. 利用策略模式，使用一个对象来缓存，key-value 的对应关系，使用 React.createElement 方法来手动创建组件

   ```typescript
   const iconMapFilled = {
     success: CheckCircleFilled,
     info: InfoCircleFilled,
     error: CloseCircleFilled,
     warning: ExclamationCircleFilled,
   };
   const iconMapOutlined = {
     success: CheckCircleOutlined,
     info: InfoCircleOutlined,
     error: CloseCircleOutlined,
     warning: ExclamationCircleOutlined,
   };
   const IconType = (description ? iconMapOutlined : iconMapFilled)[type!] || null;

   return React.createElement(IconType, { className: `${prefixCls}-icon` });
   <!-- 等价于 -->
   return <IconType className={`${prefixCls}-icon`} />;
   ```

### ts 类型声明相关

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

### css 样式编写技巧

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

2. 一个非常优美的 css 设计写法
   1. 在 alert 组件中，如果没有 description 的时候有一套 alert 组件内各元素的布局
   2. 当有了 description，我们在顶层添加一个类名，然后基于此，进行之前样式的覆盖或者修改
   ```less
   // 当alert中，存在了描述，那么我们需要从最顶层添加一个类，专门用来控制相关的样式处理
   &-with-description {
     align-items: flex-start;
     padding: @alert-with-description-padding;
   }
   &-with-description&-no-icon {
     padding: @alert-with-description-no-icon-padding-vertical 15px;
   }
   &-with-description &-icon {
     margin-right: @alert-with-description-padding-vertical;
     font-size: @alert-with-description-icon-size;
   }
   &-with-description &-message {
     display: block;
     margin-bottom: 4px;
     color: @alert-message-color;
     font-size: @font-size-lg;
   }
   ```
3. antd 的 Icon 组件，都是一个 span + svg 进行实现的
4. 所有可点击的元素都可以看成是一个 button 元素，对一个可点击元素添加样式前，首先需要进行样式重置
   1. 我们都会考虑 border，outline 来清除边框效果 cursor:pointer 添加可点击标识 padding,margin 重置间隔
   2. 如果内容是文字，我们会考虑 white-space 文字换行，text-align 文字居中，inline-block 可以设置高度，height,line-height 进行居中,user-select 文本无法选中
   3. 如果内容是其他元素，例如 icon，我们会考虑 内容溢出 overflow:hidden
5. 样式颜色变会，能提到一个对比比较好的效果
   1. 次级颜色 fade(@black, 45%); hover 的时候加深一些 fade(@black, 75%);
6. 用来添加省略号的代码

   ```css
   .ellipsis {
     white-space: nowrap;
     overflow: hidden;
     text-overflow: ellipsis;
   }
   ```

7. overflow 和 white-space
   1. 在自适应布局的时候，如果屏幕太小，可能会导致文本内容自适应
   2. 利用 white-space:nowrap 和 overflow:hidden 可以形成一种比较自然的隐藏效果，不会造成视觉上布局混乱
8. 在添加动画的时候，由于 height:auto 不能添加动画效果，我们一般会使用 max-height 设置一个差不多的值

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
