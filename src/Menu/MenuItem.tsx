import React, { ReactNode } from 'react';

interface MenuItemProps {
  children?: ReactNode;
}
const MenuItem: React.FC<MenuItemProps> = function (props) {
  return <li>{props.children}</li>;
};

export default MenuItem;
