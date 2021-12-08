import React from "react";
import type { NextPage } from "next";
import { CardInfo } from "../components";
import { withLayout } from "../layout/Layout";

const Home: NextPage = (): JSX.Element => {
  return (
    <div>
      <CardInfo />
    </div>
  );
};

export default withLayout(Home);
