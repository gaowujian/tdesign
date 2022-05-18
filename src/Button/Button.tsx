import React, { AriaAttributes, ReactNode } from 'react';
// !开发的时候引入该tsx，用于显示样式，发布的时候，组件不会和样式一起发布
// ? 如何解决？
import './style/style.less';
import classNames from 'classnames';

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

type ButtonProps = Partial<NativeButtonProps & BaseButtonProps>;

const InternalButton: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
  props,
  ref,
) => {
  const { block, onClick, className } = props;

  const classes = classNames(
    'tdesign-btn',
    {
      'block-btn': block,
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
