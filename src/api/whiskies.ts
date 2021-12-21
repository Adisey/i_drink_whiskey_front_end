import * as Apollo from "@apollo/client";
import { IMainGQLResponse } from "./menu";

import WhiskyGQL from "./whisky.graphql";
import WhiskyListGQL from "./whiskyList.graphql";

export type IWhiskyItem = {
  id: string;
  name: string;
  description?: string;
  countryId?: string;
  country?: string;
  regionId?: string;
  region?: string;
  age?: string;
  distilleryId?: string;
  distillery?: string;
};

export type IWhiskyListResponse = {
  data: {
    whiskyList: {
      list: IWhiskyItem[];
      totalCount: number;
    };
  };
} & IMainGQLResponse;

export function useWhiskyList() {
  const options = {};
  return Apollo.useQuery(WhiskyListGQL, options) as IWhiskyListResponse;
}

export type IWhiskyResponse = IMainGQLResponse & {
  data: {
    getWhisky: IWhiskyItem;
  };
};

export function useWhisky() {
  const options = {};
  return Apollo.useQuery(WhiskyGQL, options) as IWhiskyResponse;
}
