//Core
import * as Apollo from "@apollo/client";
//interface
import { IRegionListResponse } from "./types";
//graphql
import RegionListListGQL from "./regionList.graphql";

export function useRegionList(): IRegionListResponse {
  const options = {};
  return Apollo.useQuery(RegionListListGQL, options);
}
