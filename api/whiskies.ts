import * as Apollo from "@apollo/client";
import { gql } from "@apollo/client";
import { IMainGQLResponse } from "./menu";

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

export type IWhiskyResponse = IMainGQLResponse & {
  data: {
    getWhisky: IWhiskyItem;
  };
};

export const whiskyGQL = gql`
  query GetWhisky($id: String!) {
    getWhisky(id: $id) {
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
  }
`;

export function useWhisky() {
  const options = {};
  return Apollo.useQuery(whiskyGQL, options) as IWhiskyResponse;
}

export const getMockWhisky = () => {
  return [
    "61a77d2b477db2b34a7891b9",
    "61a77d2b477db2b34a7891b9",
    "61a7867069bf5fd897273847",
  ];
};
