import { RegionList } from "../graphql";
import { IMainGQLResponse } from "../../";

export type { RegionList };
export type IRegionListResponse = {
  data: RegionList;
} & IMainGQLResponse;
