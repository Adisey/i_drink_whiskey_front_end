import React from "react";
import type { GetStaticProps, NextPage } from "next";
import { MenuItem } from "../interfaces/menu.interface";
import { CardInfo } from "../components";
import { withLayout } from "../layout/Layout";

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
}

const Home: NextPage = ({ menu }: HomeProps): JSX.Element => {
  console.log(+new Date(), "-(Home)->", typeof menu, `-menu->`, menu);
  return (
    <div>
      <ul>
        {menu.map((i: MenuItem) => (
          <li key={i._id.secondCategory}>{i._id.secondCategory}</li>
        ))}
      </ul>
      <CardInfo />
    </div>
  );
};

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const menu: MenuItem[] = [
    {
      _id: { secondCategory: "Second 1" },
      pages: [
        {
          _id: "1",
          title: "Second 1 - P1",
          alias: "Second 1 - P1",
          category: "Second 1",
        },
        {
          _id: "2",
          title: "Second 1 - P2",
          alias: "Second 1 - P2",
          category: "Second 1",
        },
      ],
    },
    {
      _id: { secondCategory: "Second 2" },
      pages: [
        {
          _id: "3",
          title: "Second 2 - P1",
          alias: "Second 2 - P1",
          category: "Second 2",
        },
        {
          _id: "4",
          title: "Second 2 - P2",
          alias: "Second 2 - P2",
          category: "Second 2",
        },
      ],
    },
  ];
  return {
    props: {
      menu,
    },
  };
};
