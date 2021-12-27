import * as Apollo from "@apollo/client";
import MenuGQL from "./menu.graphql";
import { IMenuResponse } from "./types";

export function useMenu(): IMenuResponse {
  const options = {};
  return Apollo.useQuery(MenuGQL, options);
}
