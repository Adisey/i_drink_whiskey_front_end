import type { NextPage } from "next";
import React from "react";
import { Button } from "../components";
import Aaa from "../public/vercel.svg";

const Home: NextPage = (): JSX.Element => {
  return (
    <div>
      <p>xxx</p>
      <Aaa className={"xxx"} />
      <p>xxx</p>
      <Button>1</Button>
      <Button>1</Button>
      <Button arrow="down">2</Button>
    </div>
  );
};

export default Home;
