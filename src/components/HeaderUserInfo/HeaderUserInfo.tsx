//Core
import React from "react";
import Router from "next/router";
//Other
import { Button, Loading } from "../";
import { useAuthApolloProvider } from "../../apolloClient/AuthContext";
import { IDivMainProps } from "../../interfaces/HTML.elements/div.main.props";
import { useWhoAmIMemo } from "../../hooks/QraphQL/whoAmI";
//Styles
import cx from "classnames";
import Styles from "./HeaderUserInfo.module.scss";

const UserInfoMemo: React.FC<IDivMainProps> = ({
  className,
  ...props
}: IDivMainProps): JSX.Element => {
  const { isLoading, email, role } = useWhoAmIMemo();
  console.log(
    +new Date(),
    `--(RENDER)- UserInfoMemo ->`,
    isLoading,
    email,
    role
  );
  return (
    <div {...props} className={cx(Styles.userInfo, className)}>
      <Loading isLoading={isLoading} />
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
  console.log(+new Date(), `--(RENDER)- HeaderUserInfo-user ->`, user);
  return user ? (
    <div {...props} className={cx(Styles.main, className)}>
      <UserInfoMemo />
      <Button onClick={logOut}>LogOut</Button>
    </div>
  ) : (
    <div {...props} className={cx(Styles.main, className)}>
      <Button onClick={goLogin}>LogIn</Button>
    </div>
  );
};
