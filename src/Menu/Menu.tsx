import React, { ReactNode } from 'react';
// import type { MenuProps as RcMenuProps, MenuRef } from 'rc-menu';
import RcMenu, { ItemGroup } from 'rc-menu';
import type { MenuRef, SelectEventHandler } from './interface';
interface MenuProps {
  style?: React.CSSProperties;
  className?: string;
  defaultIndex?: number;
  children?: ReactNode;
  onSelect?: SelectEventHandler;
  mode?: MenuMode;
}

export type MenuMode = 'vertical' | 'horizontal';

const Menu = React.forwardRef<MenuRef, MenuProps>((props, ref) => {
  return <ul>{props.children}</ul>;
});

export default Menu;
