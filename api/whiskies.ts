import * as Apollo from "@apollo/client";
import { gql } from "@apollo/client";
import { IMainGQLResponse } from "./menu";

const whiskyListGQL = gql`
  query {
    whiskyList(pageSize: 10000) {
      list {
        id
        name
        description
        countryId
        country
        regionId
        region
        age
        distilleryId
        distillery
      }
      totalCount
    }
  }
`;

export function useWhiskyList() {
  const options = {};
  return Apollo.useQuery(whiskyListGQL, options) as IWhiskyListResponse;
}

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
export type IWhiskyListResponse = IMainGQLResponse & {
  data: {
    whiskyList: {
      list: IWhiskyItem[];
      totalCount: number;
    };
  };
};
