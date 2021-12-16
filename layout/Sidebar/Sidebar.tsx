import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import cx from "classnames";
import Styles from "./Sidebar.module.scss";
import { Menu } from "../Menu/Menu";

export interface SidebarProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Sidebar = ({ className, ...props }: SidebarProps): JSX.Element => {
  return (
    <div {...props} className={cx(Styles.sidebar, className)}>
      Sidebar
      <Menu />
    </div>
  );
};
