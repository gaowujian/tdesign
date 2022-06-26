import React, { useContext, useState, ReactElement } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/ConfigContext';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import CloseCircleOutlined from '@ant-design/icons/CloseCircleOutlined';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import ExclamationCircleFilled from '@ant-design/icons/ExclamationCircleFilled';
import ExclamationCircleOutlined from '@ant-design/icons/ExclamationCircleOutlined';
import InfoCircleFilled from '@ant-design/icons/InfoCircleFilled';
import InfoCircleOutlined from '@ant-design/icons/InfoCircleOutlined';
import { replaceElement } from './utils/reactNode';
import { CSSTransition } from 'react-transition-group';
import './style/index.less';

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

interface IconNodeProps {
  type: AlertProps['type'];
  icon: AlertProps['icon'];
  prefixCls: AlertProps['prefixCls'];
  description: AlertProps['description'];
}

const IconNode: React.FC<IconNodeProps> = (props) => {
  const { description, icon, prefixCls, type } = props;
  const iconType = (description ? iconMapOutlined : iconMapFilled)[type!] || null;
  if (icon) {
    return replaceElement(icon, <span className={`${prefixCls}-icon`}>{icon}</span>, () => ({
      className: classNames(`${prefixCls}-icon`, {
        [(icon as ReactElement).props.className]: (icon as ReactElement).props.className,
      }),
    })) as ReactElement;
  }
  return React.createElement(iconType, { className: `${prefixCls}-icon` });
};
export interface AlertProps {
  /** Type of Alert styles, options:`success`, `info`, `warning`, `error` */
  type?: 'success' | 'info' | 'warning' | 'error';
  /** Whether Alert can be closed */
  closable?: boolean;
  /** Close text to show */
  closeText?: React.ReactNode;
  /** Content of Alert */
  message?: React.ReactNode;
  /** Additional content of Alert */
  description?: React.ReactNode;
  /** Callback when close Alert */
  onClose?: React.MouseEventHandler<HTMLButtonElement>;
  /** Trigger when animation ending of Alert */
  afterClose?: () => void;
  /** Whether to show icon */
  showIcon?: boolean;
  /** https://www.w3.org/TR/2014/REC-html5-20141028/dom.html#aria-role-attribute */
  role?: string;
  style?: React.CSSProperties;
  prefixCls?: string;
  className?: string;
  banner?: boolean;
  icon?: React.ReactNode;
  /** Custome closeIcon */
  closeIcon?: React.ReactNode;
  action?: React.ReactNode;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const Alert: React.FC<AlertProps> = (props) => {
  const {
    className,
    message,
    type,
    description,
    banner,
    onMouseEnter,
    onMouseLeave,
    onClick,
    action,
    closable,
    closeText,
    closeIcon,
    showIcon,
  } = props;
  // 样式相关
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('alert');

  const classes = classNames(
    prefixCls,
    {
      [`${prefixCls}-${type}`]: type,
      [`${prefixCls}-with-description`]: !!description,
      [`${prefixCls}-banner`]: !!banner,
    },
    className,
  );

  // 用于控制动画的撞他
  const [visible, setVisible] = useState(true);
  const ref = React.createRef<HTMLDivElement>();
  const text = () => {
    return <div>item1</div>;
  };
  const list = [text, <text />, <h1>2132</h1>, 'item2', 21];
  list.map((item) => {
    console.log(React.isValidElement(item));
  });

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    setVisible(false);
    props.onClose?.(e);
  };

  const isClosable = closeText ? true : closable;

  const isShowIcon = banner && showIcon === undefined ? true : showIcon;

  return (
    <CSSTransition in={visible} classNames={prefixCls} timeout={300} unmountOnExit>
      <div
        ref={ref}
        className={classes}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        role="alert"
      >
        {isShowIcon ? (
          <IconNode description={description} icon={props.icon} prefixCls={prefixCls} type={type} />
        ) : null}
        {/* 主体其余 */}
        <div className={`${prefixCls}-content`}>
          {message ? <div className={`${prefixCls}-message`}>{message}</div> : null}
          {description ? <div className={`${prefixCls}-description`}>{description}</div> : null}
        </div>
        {/* 额外的操作区域 */}
        {action ? <div className={`${prefixCls}-action`}>{action}</div> : null}
        {/* 关闭按钮 */}
        {isClosable ? (
          <button
            type="button"
            onClick={handleClose}
            className={`${prefixCls}-close-icon`}
            tabIndex={0}
          >
            {closeText ? <span className={`${prefixCls}-close-text`}>{closeText}</span> : closeIcon}
          </button>
        ) : null}
      </div>
    </CSSTransition>
  );
};

Alert.defaultProps = {
  type: 'info',
  closable: false,
  closeIcon: <CloseOutlined />,
};

export default Alert;
