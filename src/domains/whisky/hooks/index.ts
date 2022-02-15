import { useQuery } from "@apollo/client";

import WhiskyGQL from "../graphql/whisky.graphql";
import WhiskyListGQL from "../graphql/whiskyList.graphql";
import { IWhiskyListResponse, IWhiskyResponse } from "../types";
import { settings } from "settings";

export function useWhiskyList(): IWhiskyListResponse {
  const options = { variables: settings.defaultListValue };
  return useQuery(WhiskyListGQL, options);
}

export function useWhisky(): IWhiskyResponse {
  const options = {};
  return useQuery(WhiskyGQL, options);
}
