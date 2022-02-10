import { IMainGQLResponse } from "../../../interfaces/GraphQL.main";
import { RegionList } from "./__generated__/RegionList";

export type IRegionListResponse = {
  data: RegionList;
} & IMainGQLResponse;
