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
        {item?.name} - {item?.id}
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

export const getStaticProps: GetStaticProps<IDistilleryProps> = async ({
  params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params || !params.alias || typeof params.alias !== "string") {
    return { notFound: true };
  }
  const id = params?.alias;
  try {
    const { data } = await staticApolloClient.query({
      query: DistilleryGQL,
      variables: { id },
    });
    return {
      props: {
        item: data.getDistillery,
      },
    };
  } catch (errors) {
    // ToDo: 17.12.2021 - may be go to RegionList
    console.log(+new Date(), "-()->", typeof errors, `-errors->`, errors);
    return { notFound: true };
  }

  return {
    props: {
      item: {},
    },
    revalidate: 60,
  };
};
