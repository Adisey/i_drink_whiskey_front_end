//Core
import React from "react";
import type {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from "next";
import { ParsedUrlQuery } from "querystring";
//Interfaces
import { IDistilleryListResponse } from "../../hooks/QraphQL/distillery/types";
import { GetDistillery_getDistillery } from "../../hooks/QraphQL/distillery/__generated__/GetDistillery";
//GraphQl
import DistilleryListGQL from "../../hooks/QraphQL/distillery/distilleryList.graphql";
import DistilleryGQL from "../../hooks/QraphQL/distillery/distillery.graphql";
//Other
import { withLayout } from "../../layout/Layout";
import { Error404 } from "../404";
import { staticApolloClient } from "../../apolloClient";
import { getDistilleryPatch } from "../../domains/distillery";
import { WhiskeyList } from "../../components";

interface IDistilleryProps extends Record<string, unknown> {
  item: GetDistillery_getDistillery;
}

const Distillery: NextPage<IDistilleryProps> = ({
  item,
}: IDistilleryProps): JSX.Element => {
  if (!item) {
    // ToDo: 17.12.2021 - may be go to RegionList
    return <Error404 />;
  }

  return (
    <div>
      <h1>
        {item?.name} - {item?.id} - ({item?.children?.length})
      </h1>
      <WhiskeyList whiskyList={item?.children} />
    </div>
  );
};

export default withLayout(Distillery);

export const getStaticPaths: GetStaticPaths = async () => {
  const {
    data: {
      distilleriesList: { list },
    },
  } = (await staticApolloClient.query({
    query: DistilleryListGQL,
  })) as IDistilleryListResponse;

  const paths = list.map((d: GetDistillery_getDistillery) =>
    getDistilleryPatch(d)
  );

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  if (!params || !params.alias || typeof params.alias !== "string") {
    return { notFound: true };
  }
  const id = params?.alias;
  try {
    console.log(+new Date(), `--(Distillery)- Get data ->`);
    const { data } = await staticApolloClient.query({
      query: DistilleryGQL,
      variables: { id },
      fetchPolicy: "no-cache",
    });
    console.log(
      +new Date(),
      `--(Distillery)- Data ->`,
      data?.getDistillery?.name,
      data?.getDistillery?.children?.length
    );
    return {
      props: {
        item: data.getDistillery,
      },
      revalidate: 60,
    };
  } catch (errors) {
    // ToDo: 17.12.2021 - may be go to RegionList
    console.log(+new Date(), "-()->", typeof errors, `-errors->`, errors);
    return { notFound: true };
  }
};
