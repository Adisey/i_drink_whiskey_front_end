//Core
import React from "react";
import type {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
} from "next";
import { ParsedUrlQuery } from "querystring";
//Interfaces
import {
  IDistilleryItem,
  IDistilleryListResponse,
} from "../../interfaces/discellery";
//GraphQl
import DistilleryListGQL from "../../hooks/QraphQL/distillery/discelleryList.graphql";
import DistilleryGQL from "../../hooks/QraphQL/distillery/discellery.graphql";
//Other
import { withLayout } from "../../layout/Layout";
import { Error404 } from "../404";
import { graphqlClient } from "../../api/apolloClient";
import { getDistilleryPatch } from "../../domains/distillery";
import { WhiskeyList } from "../../components";

interface DistilleryProps extends Record<string, unknown> {
  item: IDistilleryItem;
}

const Distillery = ({ item }: DistilleryProps): JSX.Element => {
  if (!item) {
    // ToDo: 17.12.2021 - may be go to DistilleryList
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
  } = (await graphqlClient.query({
    query: DistilleryListGQL,
  })) as IDistilleryListResponse;

  const paths = list.map((d: IDistilleryItem) => getDistilleryPatch(d));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<DistilleryProps> = async ({
  params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params || !params.alias || typeof params.alias !== "string") {
    return { notFound: true };
  }
  const id = params?.alias;
  try {
    const { data } = await graphqlClient.query({
      query: DistilleryGQL,
      variables: { id },
    });
    return {
      props: {
        item: data.getDistillery,
      },
    };
  } catch (errors) {
    console.log(+new Date(), "-()->", typeof errors, `-errors->`, errors);
    return { notFound: true };
  }

  return {
    props: {
      item: {},
    },
  };
};
