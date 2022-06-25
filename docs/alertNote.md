## Alert 组件开发

### HTML 属性分析

### 类型声明方面

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
