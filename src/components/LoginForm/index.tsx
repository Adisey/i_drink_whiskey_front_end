//Core
import React from "react";
import cx from "classnames";
//Other
import { IDivMainProps } from "interfaces/HTML.elements/div.main.props";
//Styles
import Styles from "./LoginForm.module.scss";

interface ILoginForm extends IDivMainProps {
  children?: never;
}

export const LoginForm: React.FC<ILoginForm> = ({ className, ...props }) => {
  return (
    <div className={cx(className, Styles.main)} {...props}>
      <div className={Styles.box}>
        <div className={Styles.title}>
          <h1>Login</h1>
        </div>
        <div className={Styles.form}>d fg dfhj</div>
      </div>
    </div>
  );
};
