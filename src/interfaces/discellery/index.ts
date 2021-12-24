import { IMainGQLResponse, IMainItem } from "../../interfaces/GraphQL.main";

export type IDistilleryListResponse = {
  data: {
    distilleryList: {
      list: IDistilleryItem[];
      totalCount: number;
    };
  };
} & IMainGQLResponse;

export type IDistilleryItem = {
  id: string;
  name: string;
  description?: string;
  countryId?: string;
  country?: string;
  regionId?: string;
  region?: string;
  children?: IMainItem[];
};
