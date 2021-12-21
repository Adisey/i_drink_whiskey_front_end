import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import cx from "classnames";
import Styles from "./Header.module.scss";

export interface HeaderProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
  return (
    <div {...props} className={cx(Styles.header, className)}>
      Header
    </div>
  );
};
