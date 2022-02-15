import { PagesListTree } from "../graphql";
import { IMainGQLResponse } from "../../";

export type { PagesListTree };

export type IMenuResponse = IMainGQLResponse & {
  data: {
    pagesListTree: PagesListTree;
  };
};
