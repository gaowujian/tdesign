import React, { AriaAttributes, ReactNode, useContext } from 'react';
// !开发的时候引入该tsx，用于显示样式，发布的时候，组件不会和样式一起发布
// ? 如何解决？
import './style/style.less';
import classNames from 'classnames';
import { tuple } from '../utils/types';
import { ConfigContext } from '../config-provider/ConfigContext';

// ! 为了减少组件开发本身的过程中，props提示项太多

// * 在domAttributes上本身就有children属性的支持
type NativeButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof AriaAttributes>;

// 支持的自定义props
// * button原生的所有事件名都会暴露出去，但是我们只会对指定的属性和事件名进行逻辑支持
// * 可能会有部分属性进行覆盖，
interface BaseButtonProps {
  // 自定义属性
  block?: boolean;

  // 支持的事件
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  children?: ReactNode;
}

export type ButtonProps = Partial<NativeButtonProps & BaseButtonProps>;

const ButtonTypes = tuple('default', 'primary', 'ghost', 'dashed', 'link', 'text');
export type ButtonType = typeof ButtonTypes;

const ButtonSize = tuple('default', 'sm', 'lg');

const InternalButton: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
  props,
  ref,
) => {
  const { block, onClick, className } = props;

  const { getPrefixCls } = useContext(ConfigContext);

  const prefixCls = getPrefixCls('btn');
  const classes = classNames(
    prefixCls,
    {
      [`${prefixCls}-block`]: block,
    },
    className,
  );
  return (
    <button className={classes} onClick={onClick} ref={ref}>
      {props.children}
    </button>
  );
};

// 支持 ref的透传
const Button = React.forwardRef(InternalButton);

// 用于在dev-tools中显示
Button.displayName = 'Button';

export default Button;
