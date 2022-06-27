import classNames from 'classnames';
import React from 'react';
import { useContext } from 'react';
import { ConfigContext } from '../config-provider/ConfigContext';
import './style/index.less';

// 首先是基于span的所有html标签，我们继承了他们的属性
export interface IconBaseProps extends React.HTMLProps<HTMLSpanElement> {
  spin?: boolean;
  rotate?: number;
}

// icon组件支持的自定义属性
export interface CustomIconComponentProps {
  width: string | number;
  height: string | number;
  fill: string;
  viewBox?: string;
  className?: string;
  style?: React.CSSProperties;
}

//
export interface IconComponentProps extends IconBaseProps {
  viewBox?: string;
  component?:
    | React.ComponentType<CustomIconComponentProps | React.SVGProps<SVGSVGElement>>
    | React.ForwardRefExoticComponent<CustomIconComponentProps>;
  ariaLabel?: React.AriaAttributes['aria-label'];
}

const Icon = React.forwardRef<HTMLSpanElement, IconBaseProps>((props, ref) => {
  const {
    className,

    spin,
    rotate,
    onClick,
    // children
    children,
    ...restProps
  } = props;

  // 样式相关
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('icon');

  const classes = classNames(
    prefixCls,
    {
      [`${prefixCls}-spin`]: !!spin,
    },
    className,
  );

  return (
    <span
      role="img"
      {...restProps}
      ref={ref}
      onClick={onClick}
      className={classes}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </span>
  );
});

// 用于在dev-tools中显示
Icon.displayName = 'Icon';

export default Icon;
