import React from "react";
import type { GetStaticProps } from "next";
import { MenuItem } from "../interfaces/menu.interface";
import { CardInfo } from "../components";
import { withLayout } from "../layout/Layout";
import { getMenu } from "../api";
import withApollo from "../lib/withApollo";
import { CharactersQuery, useCharactersQuery } from "../generated";
import { getDataFromTree } from "@apollo/client/react/ssr";
import { useAllPages } from "../generated/useAllPages";

interface HomeProps extends Record<string, unknown> {
  // menu: MenuItem[];
}

const Home = ({}: // menu
HomeProps): JSX.Element => {
  // console.log(+new Date(), "-(Home)->", typeof menu, `-menu->`, menu);
  // const { data } = useCharactersQuery();
  const { data } = useAllPages();
  console.log(+new Date(), "-(Home)->", typeof data, `-data->`, data);
  return (
    <div>
      <ul>
        {/*{menu.map((i: MenuItem) => (*/}
        {/*  <li key={i.id.secondCategory}>{i.id.secondCategory}</li>*/}
        {/*))}*/}
      </ul>
      <CardInfo />
    </div>
  );
};

export default withApollo(withLayout(Home), { getDataFromTree });
// export default withApollo(Home, { getDataFromTree });

// export const getStaticProps: GetStaticProps<HomeProps> = async () => {
//   const menu = getMenu();
//   return {
//     props: {
//       menu,
//     },
//   };
// };
