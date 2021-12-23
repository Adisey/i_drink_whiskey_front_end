import * as Apollo from "@apollo/client";

import WhiskyGQL from "../../../hooks/QraphQL/whisky/whisky.graphql";
import WhiskyListGQL from "../../../hooks/QraphQL/whisky/whiskyList.graphql";
import {
  IWhiskyListResponse,
  IWhiskyResponse,
} from "../../../interfaces/whisky";

export function useWhiskyList() {
  const options = {};
  return Apollo.useQuery(WhiskyListGQL, options) as IWhiskyListResponse;
}

export function useWhisky() {
  const options = {};
  return Apollo.useQuery(WhiskyGQL, options) as IWhiskyResponse;
}
