## Alert 组件开发

### HTML 属性分析

### 类型声明方面

1. 多个组件类型导出的合并方式 Menu 和 MenuItem, Alert 和 ErrorBoundary

   1. 建议类型声明单独放在组件的 index.tsx 中进行管理

   ```
    import Alert from './Alert';
    export type { AlertProps, AlterInterface } from './Alert';

    export default Alert;

   ```

   2. 写法一，使用 extends 语法

   ```typescript
   import ErrorBoundary from './ErrorBoundary';
   interface AlertInterface extends React.FC<AlertProps> {
     ErrorBoundary: typeof ErrorBoundary;
   }

   const Alert: AlertInterface = (props) => {};

   Alert.ErrorBoundary = ErrorBoundary;
   export default Alert;
   ```

   3. 写法二，利用 as 强制类型断言

   ```typescript
   import ErrorBoundary from './ErrorBoundary';

   type AlertType = typeof Alert & {
     ErrorBoundary: typeof ErrorBoundary;
   };

   const Alert: React.FC<AlertProps> = (props) => {};

   // 重新声明类型并添加 const ExportedAlert = Alert as AlertType;

   ExportedAlert.ErrorBoundary = ErrorBoundary;

   export default ExportedAlert;
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

```

```
