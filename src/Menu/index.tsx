import Menu from './Menu';
import { default as MenuItem } from './MenuItem';

type MenuType = typeof Menu & {
  Item: typeof MenuItem;
};

// 重新声明类型并添加
const ExportMenu = Menu as MenuType;

ExportMenu.Item = MenuItem;

export default ExportMenu;
