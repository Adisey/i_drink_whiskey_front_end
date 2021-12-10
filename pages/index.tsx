import React from "react";
import { CardInfo } from "../components";
import { withLayout } from "../layout/Layout";
import withApollo from "../api/withApollo";
import { getDataFromTree } from "@apollo/client/react/ssr";
import { useAllPages } from "../hooks/QraphQL/useAllPages";
import { IPageInfo } from "../interfaces/page.interface";

const Home = ({ ...props }): JSX.Element => {
  console.log(+new Date(), "-()->", typeof props, `-props->`, props);
  const { data } = useAllPages();
  console.log(
    +new Date(),
    "-(Home)->",
    data?.pagesList?.length,
    `-data->`,
    // data,
    data?.pagesList?.length
  );
  if (!data?.pagesList) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <ul>
        {data.pagesList.map((i: IPageInfo) => (
          <li key={i.id}>{i.name}</li>
        ))}
      </ul>
      <CardInfo />
    </div>
  );
};

export default withApollo(withLayout(Home), { getDataFromTree });
