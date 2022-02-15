import { DistilleriesList } from "../graphql";
import { IMainGQLResponse } from "../../";

export type IDistilleryListResponse = {
  data: DistilleriesList;
} & IMainGQLResponse;
