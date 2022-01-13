//Core
import React from "react";
import type {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
} from "next";
import { ParsedUrlQuery } from "querystring";
//Interfaces
import { IWhiskyListResponse } from "../../hooks/QraphQL/whisky/types";
import { GetWhisky_getWhisky } from "../../hooks/QraphQL/whisky/__generated__/GetWhisky";
import { WhiskyList_whiskyList_list } from "../../hooks/QraphQL/whisky/__generated__/WhiskyList";
// GraphQl
import WhiskyGQL from "../../hooks/QraphQL/whisky/whisky.graphql";
import WhiskyListGQL from "../../hooks/QraphQL/whisky/whiskyList.graphql";
//Other
import { CardInfo } from "../../components";
import { withLayout } from "../../layout/Layout";
import { Error404 } from "../404";
import { getWhiskyPatch } from "../../domains/whisky";
import { graphqlClient } from "../../api/apolloClient";

interface WhiskyProps extends Record<string, unknown> {
  item: GetWhisky_getWhisky;
}

const Whisky = ({ item }: WhiskyProps): JSX.Element => {
  console.log(+new Date(), "-(Whisky)->", typeof item, `-item->`, item);

  if (!item) {
    // ToDo: 17.12.2021 - may be go to WhiskyList
    return <Error404 />;
  }

  return (
    <div>
      <h1>
        {item?.name} - {item?.age} - {item?.id}
      </h1>
      <CardInfo />
    </div>
  );
};

export default withLayout(Whisky);

export const getStaticPaths: GetStaticPaths = async () => {
  const {
    data: {
      whiskyList: { list },
    },
  } = (await graphqlClient.query({
    query: WhiskyListGQL,
  })) as IWhiskyListResponse;

  const paths = list.map((w: WhiskyList_whiskyList_list) => getWhiskyPatch(w));

  return {
    paths,
    fallback: true,
  };
};
//

export const getStaticProps: GetStaticProps<WhiskyProps> = async ({
  params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params || !params.alias || typeof params.alias !== "string") {
    return { notFound: true };
  }
  const id = params?.alias;
  try {
    const { data } = await graphqlClient.query({
      query: WhiskyGQL,
      variables: { id },
    });
    return {
      props: {
        item: data.getWhisky,
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