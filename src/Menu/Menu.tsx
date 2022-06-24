import React, { ReactNode } from 'react';

interface MenuProps {
  defaultIndex?: number;
  children?: ReactNode;
}

const Menu: React.FC<MenuProps> = (props) => {
  return <div>{props.children}</div>;
};

export default Menu;
