import { IMainGQLResponse } from "interfaces/GraphQL.main";

export type IMenuResponse = IMainGQLResponse & {
  data: {
    pagesListTree: {
      countries: IMenuCountry[];
    };
  };
};

export type IMenuCountry = {
  id: string;
  name: string;
  regions: IMenuRegion[];
};

export type IMenuRegion = {
  id: string;
  name: string;
  distilleries: IMenuDistillery[];
};

export type IMenuDistillery = {
  id: string;
  name: string;
  whiskies: IMenuWhisky[];
};

export type IMenuWhisky = {
  id: string;
  name: string;
};
