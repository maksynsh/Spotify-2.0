import React from "react";
import { BaseButton } from "components";

export interface MenuItemProps {
  id: string
  title: string
  active: boolean
  path?: string
  Icon?: React.ReactElement
}

export const MenuItem = ({ title, active, path, Icon }: MenuItemProps) => {
  return (
    <li>
      <BaseButton className={`btn-base hover:bg-gray-900 ${active && 'text-slate-50 border-l-4 border-green-600 hover:bg-gray-600'}`} to={path}>
        {Icon}
        {title}
      </BaseButton>
    </li>
  );
};
