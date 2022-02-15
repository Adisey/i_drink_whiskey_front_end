//Core
import React from "react";
import type {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from "next";
import { ParsedUrlQuery } from "querystring";
import { staticApolloClient } from "apolloClient";
//Domains
import {
  IDistilleryListResponse,
  GetRegion_getRegion,
  GetRegion_getRegion_children,
  GetDistillery_getDistillery,
} from "../../domains";
//GraphQl
import RegionListGQL from "domains/region/graphql/regionList.graphql";
import GetRegion from "domains/region/graphql/region.graphql";
//Other
import { settings } from "../../settings";
import { withLayout } from "layout/Layout";
import { Error404 } from "../404";
import { getRegionPatch } from "../../domains/region";
import { DistilleryList } from "components";

interface IRegionProps extends Record<string, unknown> {
  item: GetRegion_getRegion;
}

const Region: NextPage<IRegionProps> = ({
  item,
}: IRegionProps): JSX.Element => {
  if (!item) {
    // ToDo: 17.12.2021 - may be go to RegionList
    return <Error404 />;
  }

  const distilleries: GetDistillery_getDistillery[] =
    item?.children?.map((i: GetRegion_getRegion_children) => {
      const distillery = {
        id: i.id,
        name: i.name,
      } as GetDistillery_getDistillery;
      return distillery;
    }) || [];

  return (
    <div>
      <h1>
        {item?.name} - {item?.id}
      </h1>
      <DistilleryList distilleries={distilleries} />
    </div>
  );
};

export default withLayout(Region);

export const getStaticPaths: GetStaticPaths = async () => {
  const {
    data: {
      regionsList: { list },
    },
  } = (await staticApolloClient.query({
    query: RegionListGQL,
  })) as IDistilleryListResponse;

  const paths = list.map((d: GetRegion_getRegion) => getRegionPatch(d));

  return {
    paths,
    fallback: true,
  };
};

// export const getStaticProps: GetStaticProps<IRegionProps> = async ({ // ToDo: 11.02.2022 - Check
export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params || !params.alias || typeof params.alias !== "string") {
    return { notFound: true };
  }
  const id = params?.alias;
  try {
    const { data } = await staticApolloClient.query({
      query: GetRegion,
      variables: { id },
      fetchPolicy: settings.pageStaticPropsCacheFetchPolicy,
    });
    return {
      props: {
        item: data.getRegion,
      },
      revalidate: settings.pageStaticPropsRevalidateSecond,
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
  };
};
