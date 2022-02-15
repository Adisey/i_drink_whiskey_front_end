import * as Apollo from "@apollo/client";
import MenuGQL from "domains/menu/graphql/menu.graphql";
import { IMenuResponse } from "domains/menu/types";

export function useMenu(): IMenuResponse {
  const options = {};
  return Apollo.useQuery(MenuGQL, options);
}
