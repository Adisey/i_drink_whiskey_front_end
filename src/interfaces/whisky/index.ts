import { IMainGQLResponse } from "../GraphQL.main";

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

export type IWhiskyResponse = IMainGQLResponse & {
  data: {
    getWhisky: IWhiskyItem;
  };
};
