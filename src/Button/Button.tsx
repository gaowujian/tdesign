import React from 'react';
// !开发的时候引入该tsx，用于显示样式，发布的时候，组件不会和样式一起发布
// ? 如何解决？
import './style/style.less';
import classNames from 'classnames';

// 支持的自定义props
interface ButtonProps {
  block?: boolean;
}

const Button: React.FC<ButtonProps> = (props) => {
  const { block } = props;
  const classes = classNames('tdesign-btn', {
    'block-btn': block,
  });
  return <button className={classes}>Button</button>;
};

export default Button;
