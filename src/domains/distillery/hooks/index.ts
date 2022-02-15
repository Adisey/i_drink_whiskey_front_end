//Core
import * as Apollo from "@apollo/client";
//interface
import { IDistilleryListResponse } from "domains/distillery/types";
//graphql
import DistilleryListGQL from "domains/distillery/graphql/distilleryList.graphql";

export function useDistilleryList(): IDistilleryListResponse {
  const options = {};
  return Apollo.useQuery(DistilleryListGQL, options);
}
