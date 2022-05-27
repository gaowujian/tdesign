## Hello tdesign!

自研 React 组件库

## 项目目的

- 熟练掌握组件开发流程
- 熟练使用各类 react 特性封装组件

## 项目将使用的技术

- 组件 api：参考 ant design
- 样式： 自定义 less + classNames，并支持按需加载
- 逻辑复用 ：全部采用 hooks 进行封装
  - 例如 useButton, useModal, usePopover
- 实现方式：

  - 每个组件会尽可能做两种方式的开发，并记录开发过程中的心得

  - 1. 全部自定义
    - 优势： 灵活度高，适合高度自定义情景
    - 劣势： 开发慢
  - 2. 基于无头组件进行部分开发(headless ui, reachUI, react aria)
    - 优势：对于通用组件有比较完备的 accessibility 支持以及 function 的实现，关注点更多的在于自己的 styling
    - 劣势：暂无，边开发边补充
