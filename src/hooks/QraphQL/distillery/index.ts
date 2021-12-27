//Core
import * as Apollo from "@apollo/client";
//interface
import { IDistilleryListResponse } from "hooks/QraphQL/distillery/types";
//graphql
import DistilleryListGQL from "hooks/QraphQL/distillery/distilleryList.graphql";

export function useDistilleryList(): IDistilleryListResponse {
  const options = {};
  return Apollo.useQuery(DistilleryListGQL, options);
}
