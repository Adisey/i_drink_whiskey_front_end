//Core
import React, { useEffect } from "react";
import Router from "next/router";
//Other
import { useToken } from "hooks/useToken";
//Styles
import Styles from "./UserInfo.module.scss";
import { Button } from "components";

export const UserInfo: React.FC = () => {
  const { user, getToken, cleanToken } = useToken();

  useEffect(() => {
    getToken();
  }, []);

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
