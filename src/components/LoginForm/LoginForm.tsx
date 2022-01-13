//Core
import React from "react";
import cx from "classnames";
//Other
import { IDivMainProps } from "interfaces/HTML.elements/div.main.props";
import { loginGQL } from "hooks/QraphQL/login";
//Styles
import Styles from "./LoginForm.module.scss";

interface ILoginForm extends IDivMainProps {
  children?: never;
}

export const LoginForm: React.FC<ILoginForm> = ({ className, ...props }) => {
  const login = async () => {
    const data = await loginGQL({ email: "admin", password: "admin" });
    console.log(+new Date(), "-(FORM)->", typeof data, `-data->`, data);
  };

  return (
    <div className={cx(className, Styles.main)} {...props}>
      <div className={Styles.box}>
        <div className={Styles.title}>
          <h1>Login</h1>
        </div>
        <div className={Styles.form}>
          <button onClick={() => login()}>Press</button>
        </div>
      </div>
    </div>
  );
};
