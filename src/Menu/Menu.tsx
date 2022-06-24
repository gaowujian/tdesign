import React, { ReactNode } from 'react';
import type { MenuProps as RcMenuProps, MenuRef } from 'rc-menu';
import RcMenu, { ItemGroup } from 'rc-menu';
interface MenuProps {
  defaultIndex?: number;
  children?: ReactNode;
}

export type MenuMode = 'vertical' | 'horizontal';

const Menu: React.FC<MenuProps> = (props) => {
  return <ul>{props.children}</ul>;
};

export default Menu;
