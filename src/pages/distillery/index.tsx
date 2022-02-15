//Core
import React from "react";
import { NextPage } from "next";

import { pageWrapper } from "../../layout/pageWrapper";
import { useDistilleryList } from "../../domains";
import { DistilleryList } from "../../components";

const DistilleryMain: NextPage = (): JSX.Element => {
  const { loading, data } = useDistilleryList();
  if (loading) {
    return <div>Loading..</div>;
  }
  const distilleryList = data?.distilleriesList?.list || [];

  return (
    <div>
      <h1>Distillery Main</h1>
      <DistilleryList distilleries={distilleryList} />
    </div>
  );
};

export default pageWrapper(DistilleryMain);
