import * as Apollo from "@apollo/client";
import MenuGQL from "hooks/QraphQL/menu/menu.graphql";
import { IMenuResponse } from "../../../interfaces/menu";

export function useMenu() {
  const options = {};
  return Apollo.useQuery(MenuGQL, options) as IMenuResponse;
}
