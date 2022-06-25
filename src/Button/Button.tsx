import React, { AriaAttributes, MouseEventHandler, ReactNode, useContext } from 'react';
// !开发的时候引入该tsx，用于显示样式，发布的时候，组件不会和样式一起发布
// ? 如何解决？
import './style/index.less';
import classNames from 'classnames';
import { tuple } from '../utils/types';
import { ConfigContext } from '../config-provider/ConfigContext';

// ! 为了减少组件开发本身的过程中，props提示项太多

// 支持的自定义props
// * button原生的所有事件名都会暴露出去，但是我们只会对指定的属性和事件名进行逻辑支持
// * 可能会有部分属性进行覆盖，

// 组件自定义属性需要的类型
//  todo 为什么这种比较好？
const ButtonTypes = tuple('default', 'primary', 'ghost', 'dashed', 'link', 'text');
export type ButtonType = typeof ButtonTypes[number];

// export type ButtonType = 'default' | 'primary' | 'ghost' | 'dashed' | 'link' | 'text';
export type ButtonSize = 'lg' | 'sm';

interface BaseButtonProps {
  // 自定义属性，所有的属性不仅携带样式的不同，也会携带逻辑上的不同
  block?: boolean;
  type?: ButtonType;
  size?: ButtonSize;
  danger?: boolean;
  style?: React.CSSProperties;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
  // 支持的事件, 可以支持任意的html标签
  onClick?: React.MouseEventHandler<HTMLElement>;
}

// 我们需要把自定义的冲突属性从react的类型定义中去除
type ConflictTypes = 'onClick' | 'type' | 'href';

// * 在domAttributes上本身就有children属性的支持
//  nativeButtonProps主要用来提供开发的体验，有较好的代码提示，但是需要对相关自定义属性进行删除
// 例如 组件自定义个type和button的type不一样，button的type 有 'submit' | 'reset' | 'button' | undefined;
// htmlType 对应原来标签的type类型 React.ButtonHTMLAttributes<HTMLButtonElement>['type'];

// 如果是基于button的㢟，我们需要剔除link，支持设置htmlType
type NativeButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  keyof AriaAttributes | ConflictTypes
> &
  BaseButtonProps & {
    type: Exclude<ButtonType, 'link'>;
    htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  };

// 链接按钮的type一定是link,并且规定必须有href
type AnchorButtonProps = BaseButtonProps & {
  type: 'link';
  href: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof AriaAttributes | ConflictTypes>;

export type ButtonProps = Partial<NativeButtonProps | AnchorButtonProps>;

// 由于ref可能指向button或者指向a，
// 在a上的ref类型是  React.LegacyRef<HTMLAnchorElement> | undefined
// 在button上的ref类型是  React.LegacyRef<HTMLButtonElement> | undefined
// !无法设置一个通用的ref，所以我们暂时先给了一个unknown
const InternalButton: React.ForwardRefRenderFunction<unknown, ButtonProps> = (props, ref) => {
  // 提取组件内所用的所有props
  const { block, type, onClick, className, size, danger, style, disabled, ...rest } = props;

  // 样式相关
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('btn');

  const classes = classNames(
    prefixCls,
    {
      [`${prefixCls}-block`]: block,
      [`${prefixCls}-${type}`]: type,
      [`${prefixCls}-${size}`]: size,
      [`${prefixCls}-danger`]: danger,
      // 由于button有自己的默认样式，我们需要通过给携带 href属性的link button添加额外的 类，用于修饰样式
      // [`${prefixCls}-disabled`]: (rest as AnchorButtonProps).href && disabled,
    },
    className,
  );

  // 点击处理函数
  const handleClick: MouseEventHandler<HTMLElement> = (e) => {
    if (disabled) {
      // 阻止button默认行为, 例如 表单的提交和link的跳转
      e.preventDefault();
      // 直接返回，不调用函数
      return;
    }
    onClick && onClick(e);
  };

  // !暂时使用as进行强制推断
  const buttonRef = ref as any;

  // 利用if推断出 props类型 Partial<AnchorButtonProps>
  if (type === 'link') {
    return (
      <a
        className={classes}
        onClick={handleClick}
        ref={buttonRef}
        href={props.href}
        // @ts-ignore
        disabled={disabled}
        style={style}
      >
        {props.children}
      </a>
    );
  }

  // props
  // 单独的 props 只能推断出 (parameter) props: ButtonProps
  // 利用 as 认为推断出 props类型 NativeButtonProps

  return (
    <button
      className={classes}
      onClick={handleClick}
      ref={buttonRef}
      type={(props as NativeButtonProps).htmlType}
      disabled={disabled}
      style={style}
    >
      {props.children}
    </button>
  );
};

// 支持 ref的透传
const Button = React.forwardRef(InternalButton);

// 用于在dev-tools中显示
Button.displayName = 'Button';

Button.defaultProps = {
  type: 'default',
};

export default Button;
