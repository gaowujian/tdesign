import React from 'react';
//开发的时候引入该tsx，用于显示样式，发布的时候，组件不会和样式一起发布
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
  return <div className={classes}>Button</div>;
};

export default Button;
