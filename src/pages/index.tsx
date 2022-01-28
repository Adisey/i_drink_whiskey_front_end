import React from "react";
import { NextPage } from "next";
import { pageWrapper } from "../layout/pageWrapper";

const Home: NextPage = (): JSX.Element => {
  return <div>WELCOME to Main Page</div>;
};

export default pageWrapper(Home);
