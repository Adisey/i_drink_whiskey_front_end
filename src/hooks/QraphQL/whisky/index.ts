import * as Apollo from "@apollo/client";

import WhiskyGQL from "../../../hooks/QraphQL/whisky/whisky.graphql";
import WhiskyListGQL from "../../../hooks/QraphQL/whisky/whiskyList.graphql";
import {
  IWhiskyListResponse,
  IWhiskyResponse,
} from "hooks/QraphQL/whisky/types";

export function useWhiskyList(): IWhiskyListResponse {
  const options = {};
  return Apollo.useQuery(WhiskyListGQL, options);
}

export function useWhisky(): IWhiskyResponse {
  const options = {};
  return Apollo.useQuery(WhiskyGQL, options);
}
