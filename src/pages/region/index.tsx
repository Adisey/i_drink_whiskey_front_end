//Core
import React from "react";
import { NextPage } from "next";

import { pageWrapper } from "../../layout/pageWrapper";
import { RegionList } from "../../components";
import { useRegionList } from "../../domains/";

const RegionMain: NextPage = (): JSX.Element => {
  const { loading, data } = useRegionList();
  if (loading) {
    return <div>Loading..</div>;
  }
  const regionList = data?.regionsList?.list || [];

  return (
    <div>
      <h1>Region Main</h1>
      <RegionList regions={regionList} />
    </div>
  );
};

export default pageWrapper(RegionMain);
