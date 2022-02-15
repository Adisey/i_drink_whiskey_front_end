import { Whoami } from "../graphql/__generated__/whoami";
import { IMainGQLResponse } from "../../";

export type IWhoAmIResponse = IMainGQLResponse & {
  data: Whoami;
};
