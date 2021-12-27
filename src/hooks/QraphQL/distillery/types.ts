import { IMainGQLResponse } from "../../../interfaces/GraphQL.main";
import { DistilleriesList } from "./__generated__/DistilleriesList";

export type IDistilleryListResponse = {
  data: DistilleriesList;
} & IMainGQLResponse;
