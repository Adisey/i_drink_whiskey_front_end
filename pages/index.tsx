import React from "react";
import type { GetStaticProps } from "next";
import { MenuItem } from "../interfaces/menu.interface";
import { CardInfo } from "../components";
import { withLayout } from "../layout/Layout";
import { getMenu } from "../api";

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
}

const Home = ({ menu }: HomeProps): JSX.Element => {
  console.log(+new Date(), "-(Home)->", typeof menu, `-menu->`, menu);
  return (
    <div>
      <ul>
        {menu.map((i: MenuItem) => (
          <li key={i.id.secondCategory}>{i.id.secondCategory}</li>
        ))}
      </ul>
      <CardInfo />
    </div>
  );
};

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const menu = getMenu();
  return {
    props: {
      menu,
    },
  };
};
