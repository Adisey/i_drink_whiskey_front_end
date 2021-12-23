//Core
import * as Apollo from "@apollo/client";
//interface
import { IDistilleryListResponse } from "../../../interfaces/discellery";
//graphql
import DistilleryListGQL from "./discelleryList.graphql";

export function useDistilleryList() {
  const options = {};
  return Apollo.useQuery(DistilleryListGQL, options) as IDistilleryListResponse;
}
