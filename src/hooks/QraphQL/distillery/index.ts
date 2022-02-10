//Core
import * as Apollo from "@apollo/client";
//interface
import { IDistilleryListResponse } from "./types";
//graphql
import DistilleryListGQL from "./distilleryList.graphql";

export function useDistilleryList(): IDistilleryListResponse {
  const options = {};
  return Apollo.useQuery(DistilleryListGQL, options);
}
