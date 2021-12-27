import { IMainGQLResponse } from "interfaces/GraphQL.main";
import { PagesListTree } from "./__generated__/PagesListTree";

export type IMenuResponse = IMainGQLResponse & {
  data: {
    pagesListTree: PagesListTree;
  };
};
