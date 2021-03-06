//Core
import React from "react";
import type {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from "next";
import { ParsedUrlQuery } from "querystring";
//Domain
import {
  GetWhiskyById_getWhiskyById,
  GetWhiskyById,
  WhiskyList_whiskyList_list,
  IWhiskyListResponse,
} from "../../domains";
// GraphQl
import WhiskyGQL from "../../domains/whisky/graphql/whisky.graphql";
import WhiskyListGQL from "../../domains/whisky/graphql/whiskyList.graphql";
//Other
import { settings } from "../../settings";
import { CardInfo } from "../../components";
import { withLayout } from "../../layout/Layout";
import { Error404 } from "../404";
import { getWhiskyPatch } from "../../domains/whisky/tools";
import { staticApolloClient } from "../../apolloClient";
import Head from "next/head";

interface IWhiskyProps extends Record<string, unknown> {
  item: GetWhiskyById_getWhiskyById;
}

const Whisky: NextPage<IWhiskyProps> = ({
  item,
}: IWhiskyProps): JSX.Element => {
  if (!item) {
    // ToDo: 17.12.2021 - may be go to WhiskyList
    return <Error404 />;
  }

  const title = `${item?.name}${item?.age ? " " + item?.age : ""}`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} key="title" />
      </Head>
      <h1>
        {item?.name} - {item?.age} - {item?.id}
      </h1>
      <h2>Name: {item?.name}</h2>
      <h2>Age: {item?.age}</h2>
      <h2>Id:{item?.id}</h2>
      <CardInfo />
    </>
  );
};

export default withLayout(Whisky);

export const getStaticPaths: GetStaticPaths = async () => {
  const {
    data: {
      whiskyList: { list },
    },
  } = (await staticApolloClient.query({
    query: WhiskyListGQL,
  })) as IWhiskyListResponse;

  const paths = list.map((w: WhiskyList_whiskyList_list) => getWhiskyPatch(w));

  return {
    paths,
    fallback: true,
  };
};
//

export const getStaticProps: GetStaticProps<IWhiskyProps> = async ({
  params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params || !params.alias || typeof params.alias !== "string") {
    return { notFound: true };
  }
  const id = params?.alias;
  try {
    const { data } = await staticApolloClient.query<GetWhiskyById>({
      query: WhiskyGQL,
      variables: { id },
      fetchPolicy: settings.pageStaticPropsCacheFetchPolicy,
    });
    return {
      props: {
        item: data.getWhiskyById,
      },
      revalidate: settings.pageStaticPropsRevalidateSecond,
    };
  } catch (errors) {
    console.error(
      +new Date(),
      "-(whisky/[id] getStaticProps)->",
      id,
      `-errors->`,
      errors
    );
    return {
      redirect: {
        destination: "/whisky",
        permanent: false,
      },
    };
  }
};
