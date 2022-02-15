import * as Apollo from "@apollo/client";

import WhiskyGQL from "../graphql/whisky.graphql";
import WhiskyListGQL from "../graphql/whiskyList.graphql";
import { IWhiskyListResponse, IWhiskyResponse } from "../types";

export function useWhiskyList(): IWhiskyListResponse {
  const options = {};
  return Apollo.useQuery(WhiskyListGQL, options);
}

export function useWhisky(): IWhiskyResponse {
  const options = {};
  return Apollo.useQuery(WhiskyGQL, options);
}
