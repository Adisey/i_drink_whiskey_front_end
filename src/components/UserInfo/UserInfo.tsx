//Core
import React from "react";
import Router from "next/router";
//Other
import { Button } from "../";
import { useAuthApolloProvider } from "../../apolloClient/AuthContext";
//Styles
import Styles from "./UserInfo.module.scss";

export const UserInfo: React.FC = () => {
  const { user, cleanToken } = useAuthApolloProvider();

  const goLogin = () => {
    Router.push("/login");
  };
  const logOut = () => {
    cleanToken();
    goLogin();
  };

  return user ? (
    <div className={Styles.main}>
      <div className={Styles.userName}>{user}</div>
      <Button onClick={logOut}>LogOut</Button>
    </div>
  ) : (
    <div className={Styles.main}>
      <Button onClick={goLogin}>LogIn</Button>
    </div>
  );
};
