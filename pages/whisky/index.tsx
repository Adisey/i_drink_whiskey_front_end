import React from "react";
import type { GetStaticProps } from "next";
import { MenuItem } from "../../interfaces/menu.interface";
import { withLayout } from "../../layout/Layout";
import { getMenu } from "../../api";

interface WhiskyMainProps extends Record<string, unknown> {
  menu: MenuItem[];
}

const WhiskyMain = ({ menu }: WhiskyMainProps): JSX.Element => {
  console.log(+new Date(), "-(Home)->", typeof menu, `-menu->`, menu);
  return (
    <div>
      <ul>
        {menu.map((i: MenuItem) => (
          <li key={i.id.secondCategory}>{i.id.secondCategory}</li>
        ))}
      </ul>
    </div>
  );
};

export default withLayout(WhiskyMain);

export const getStaticProps: GetStaticProps<WhiskyMainProps> = async () => {
  const menu = getMenu();
  return {
    props: {
      menu,
    },
  };
};
