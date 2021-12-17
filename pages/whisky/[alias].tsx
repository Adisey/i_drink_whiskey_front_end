import React from "react";
import type {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
} from "next";
import { ParsedUrlQuery } from "querystring";
import { MenuItem, PageItem } from "../../interfaces/menu.interface";
import { CardInfo } from "../../components";
import { withLayout } from "../../layout/Layout";
import { getMenu, getPage } from "../../api";
import { Error404 } from "../404";
import { pageWrapper } from "../../layout/pageWrapper";
import { getMockWhisky, whiskyGQL } from "../../api/whiskies";
import { graphqlClient } from "../../layout/withApollo";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { settings } from "../../settings";

interface WhiskyProps extends Record<string, unknown> {
  menu: MenuItem[];
  page: PageItem;
  data: any;
}

const Whisky = (props: any): JSX.Element => {
  console.log(+new Date(), "-()->", typeof props, `-props->`, props);
  // console.log(+new Date(), "-(Whisky)->", typeof menu, `-menu->`, menu);
  // console.log(+new Date(), "-(Whisky)->", typeof page, `-page->`, page);
  // if (!menu || !page) {
  //   return <Error404 />;
  // }

  return (
    <div>
      <h1>Hi</h1>
      <CardInfo />
    </div>
  );
};

// export default withLayout(Whisky);
// export default pageWrapper(Whisky);
export default Whisky;

// export const getStaticProps = async (props: any) => {
//   console.log(+new Date(), `--(getStaticProps)-  ->`, props);
//   const client = graphqlClient();
//   const { data } = await client.query({ query: whiskyGQL });
//   console.log(+new Date(), "-(getStaticProps)->", typeof data, `-data->`, data);
// };

// export const getServerSideProps = async () => {
//   const client = graphqlClient();
//   const { data } = await client.query({ query: whiskyGQL });
//   console.log(
//     +new Date(),
//     "-(getServerSideProps)->",
//     typeof data,
//     `-data->`,
//     data
//   );
// };

export const getStaticPaths: GetStaticPaths = async () => {
  const whiskys = getMockWhisky();
  const paths = whiskys.map((w: string) => `/whisky/${w}`);
  console.log(
    +new Date(),
    "-(getStaticPaths)->",
    typeof paths,
    `-paths->`,
    paths
  );
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
  const menu = getMenu();
  const id = params?.alias;
  console.log(+new Date(), "-(getStaticProps)->", typeof id, `-id->`, id);
  const page = getPage(params.alias);
  console.log(+new Date(), "-(getStaticProps)->", typeof page, `-page->`, page);

  const client = graphqlClient;
  const { data } = await client.query({
    query: whiskyGQL,
    variables: { id },
  });
  console.log(+new Date(), "-(getStaticProps)->", typeof data, `-data->`, data);

  return {
    props: {
      menu,
      page,
      data,
    },
  };
};
