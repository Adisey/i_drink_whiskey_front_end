import React from "react";
import { useWhiskyList } from "../../api";
import { pageWrapper } from "../../layout/pageWrapper";
import { WhiskeyList } from "../../components";

const WhiskyMain = (): JSX.Element => {
  const { loading, data } = useWhiskyList();
  if (loading) {
    return <div>Loading..</div>;
  }

  const whiskyList = data?.whiskyList?.list || [];
  return (
    <div>
      <h1>WhiskyMain</h1>
      <WhiskeyList whiskyList={whiskyList} />
    </div>
  );
};

export default pageWrapper(WhiskyMain);
