//Core
import React from "react";
import Router from "next/router";
//Other
import { Button } from "../";
import { useAuthApolloProvider } from "../../apolloClient/AuthContext";
import { IDivMainProps } from "../../interfaces/HTML.elements/div.main.props";
import { useWhoAmI } from "../../hooks/QraphQL/whoAmI";
//Styles
import cx from "classnames";
import Styles from "./UserInfo.module.scss";

const UserInfo: React.FC<IDivMainProps> = ({
  className,
  ...props
}: IDivMainProps): JSX.Element => {
  const { loading, data } = useWhoAmI();
  if (loading) {
    return (
      <div {...props} className={cx(Styles.loading, className)}>
        Loading...
      </div>
    );
  }
  const { whoami } = data;
  const { email, role } = whoami;

  return (
    <div {...props} className={cx(Styles.userInfo, className)}>
      <div className={Styles.userName}>{email}</div>
      <div className={Styles.userRole}>{role}</div>
    </div>
  );
};

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
      <UserInfo />
      <Button onClick={logOut}>LogOut</Button>
    </div>
  ) : (
    <div {...props} className={cx(Styles.main, className)}>
      <Button onClick={goLogin}>LogIn</Button>
    </div>
  );
};
