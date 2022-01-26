//Core
import React from "react";
import Router from "next/router";
//Other
import { Button } from "../";
import { useAuthApolloProvider } from "../../apolloClient/AuthContext";
import { IDivMainProps } from "../../interfaces/HTML.elements/div.main.props";
//Styles
import cx from "classnames";
import Styles from "./UserInfo.module.scss";

export const HeaderUserInfo: React.FC<IDivMainProps> = ({
  className,
  ...props
}: IDivMainProps): JSX.Element => {
  const { user, cleanToken } = useAuthApolloProvider();

  const goLogin = () => {
    Router.push("/login");
  };
  const logOut = () => {
    cleanToken();
    goLogin();
  };

  return user ? (
    <div {...props} className={cx(Styles.main, className)}>
      <div className={Styles.userName}>{user}</div>
      <Button onClick={logOut}>LogOut</Button>
    </div>
  ) : (
    <div className={Styles.main}>
      <Button onClick={goLogin}>LogIn</Button>
    </div>
  );
};
