import React from "react";
import type {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
} from "next";
import { ParsedUrlQuery } from "querystring";
import { CardInfo } from "../../components";
import { withLayout } from "../../layout/Layout";
import { Error404 } from "../404";
import { pageWrapper } from "../../layout/pageWrapper";
import {
  IWhiskyItem,
  IWhiskyListResponse,
  whiskyGQL,
  whiskyListGQL,
} from "../../api/whiskies";
import { graphqlClient } from "../../layout/withApollo";

interface WhiskyProps extends Record<string, unknown> {
  item: IWhiskyItem;
}

const Whisky = ({ item }: WhiskyProps): JSX.Element => {
  console.log(+new Date(), "-(Whisky)->", typeof item, `-item->`, item);

  if (!item) {
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
    query: whiskyListGQL,
  })) as IWhiskyListResponse;

  const paths = list.map((w: IWhiskyItem) => `/whisky/${w.id}`);

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
      query: whiskyGQL,
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
