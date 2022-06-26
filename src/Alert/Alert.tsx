import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/ConfigContext';
import './style/index.less';

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

  const [closed, setClosed] = useState(false);
  const ref = React.createRef<HTMLDivElement>();

  // return <div className={classes}>{message}</div>;
  return (
    <div
      ref={ref}
      data-show={!closed}
      className={classes}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      role="alert"
      // {...dataOrAriaProps}
    >
      {/* {isShowIcon ? (
        <IconNode description={description} icon={props.icon} prefixCls={prefixCls} type={type} />
      ) : null} */}
      <div className={`${prefixCls}-content`}>
        {message ? <div className={`${prefixCls}-message`}>{message}</div> : null}
        {description ? <div className={`${prefixCls}-description`}>{description}</div> : null}
      </div>
      {action ? <div className={`${prefixCls}-action`}>{action}</div> : null}
      {/* <CloseIcon
        isClosable={!!isClosable}
        closeText={closeText}
        prefixCls={prefixCls}
        closeIcon={closeIcon}
        handleClose={handleClose}
      /> */}
    </div>
  );
};

Alert.defaultProps = {
  type: 'info',
};

export default Alert;
