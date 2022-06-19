// ?todo 作为一个全局的配置组件，同时也提供全局的context

import { defaultPrefixCls } from './ConfigContext';

function getGlobalPrefixCls() {
  return defaultPrefixCls;
}

export const globalConfig = () => ({
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => {
    if (customizePrefixCls) return customizePrefixCls;
    return suffixCls ? `${getGlobalPrefixCls()}-${suffixCls}` : getGlobalPrefixCls();
  },
});
