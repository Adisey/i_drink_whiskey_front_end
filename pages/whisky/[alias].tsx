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

interface WhiskyProps extends Record<string, unknown> {
  menu: MenuItem[];
  page: PageItem;
}

const Whisky = ({ menu, page }: WhiskyProps): JSX.Element => {
  console.log(+new Date(), "-(Whisky)->", typeof menu, `-menu->`, menu);
  console.log(+new Date(), "-(Whisky)->", typeof page, `-page->`, page);
  if (!menu || !page) {
    return <Error404 />;
  }

  return (
    <div>
      <h1>
        {page.id} - {page.title} - {page.alias}
      </h1>
      <ul>
        {menu.map((i: MenuItem) => (
          <li key={i.id.secondCategory}>{i.id.secondCategory}</li>
        ))}
      </ul>
      <CardInfo />
    </div>
  );
};

export default withLayout(Whisky);

export const getStaticPaths: GetStaticPaths = async () => {
  const menu = getMenu();
  const paths = menu.flatMap((s) => s.pages.map((p) => `/whisky/${p.alias}`));
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
  return {
    props: {
      menu,
      page,
    },
  };
};
