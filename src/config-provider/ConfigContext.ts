import React from 'react';

// 定义默认的样式前缀
export const defaultPrefixCls = 'tdesign';

export interface ConfigConsumerProps {
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
}

const defaultGetPrefixCls = (suffixCls?: string, customizePrefixCls?: string) => {
  if (customizePrefixCls) return customizePrefixCls;

  return suffixCls ? `${defaultPrefixCls}-${suffixCls}` : defaultPrefixCls;
};

export const ConfigContext = React.createContext<ConfigConsumerProps>({
  // We provide a default function for Context without provider
  // ! 在没有provider组件在外的时候，提供了一个默认的方法
  getPrefixCls: defaultGetPrefixCls,
});
