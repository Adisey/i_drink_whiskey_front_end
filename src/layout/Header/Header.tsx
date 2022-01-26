//Core
import React from "react";
//Other
import { HeaderUserInfo } from "../../components";
import { IDivMainProps } from "../../interfaces/HTML.elements/div.main.props";
//Styles
import cx from "classnames";
import Styles from "./Header.module.scss";

export const Header: React.FC<IDivMainProps> = ({
  className,
  ...props
}: IDivMainProps): JSX.Element => {
  return (
    <div {...props} className={cx(Styles.main, className)}>
      <div className={Styles.titlePlace}>Title</div>
      <div className={Styles.logoPlace}>Logo</div>
      <div className={Styles.rightPlace}>
        <HeaderUserInfo className={Styles.userInfo} />
        <div className={Styles.mobileMenu}>MobileMenu</div>
      </div>
    </div>
  );
};
