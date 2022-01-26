import { IMainGQLResponse } from "../../../interfaces/GraphQL.main";
import { whoami } from "./__generated__/whoami";

export type IWhoAmIResponse = IMainGQLResponse & {
  data: whoami;
};
