import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import cx from "classnames";
import Styles from "./Footer.module.scss";

export interface FooterProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Footer = ({ className, ...props }: FooterProps): JSX.Element => {
  return (
    <div {...props} className={cx(Styles.footer, className)}>
      Footer
    </div>
  );
};
