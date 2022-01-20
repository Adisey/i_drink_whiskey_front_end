import React from "react";
import { pageWrapper } from "../layout/pageWrapper";
import { UserInfo } from "components";

const Home = (): JSX.Element => {
  return (
    <div>
      WELCOME
      <UserInfo />
    </div>
  );
};

export default pageWrapper(Home);
