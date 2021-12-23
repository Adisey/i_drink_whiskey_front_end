import React from "react";
import { pageWrapper } from "../../layout/pageWrapper";
import { WhiskeyList } from "../../components";
import { useWhiskyList } from "../../hooks/QraphQL/whisky";

const WhiskyMain = (): JSX.Element => {
  const { loading, data } = useWhiskyList();
  if (loading) {
    return <div>Loading..</div>;
  }

  const distilleryList = data?.whiskyList?.list || [];
  return (
    <div>
      <h1>WhiskyMain</h1>
      <WhiskeyList whiskyList={distilleryList} />
    </div>
  );
};

export default pageWrapper(WhiskyMain);
