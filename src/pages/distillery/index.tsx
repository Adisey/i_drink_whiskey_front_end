//Core
import React from "react";

import { pageWrapper } from "../../layout/pageWrapper";
import { useDistilleryList } from "../../hooks/QraphQL/distillery";
import { DistilleryList } from "../../components";

const DistilleryMain = (): JSX.Element => {
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
