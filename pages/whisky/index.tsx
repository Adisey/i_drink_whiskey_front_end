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
      WhiskyMain
      <WhiskeyList whiskyList={whiskyList} />
    </div>
  );
};

export default pageWrapper(WhiskyMain);
