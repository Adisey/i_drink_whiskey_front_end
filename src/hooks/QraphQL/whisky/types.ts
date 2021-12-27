import { IMainGQLResponse } from "interfaces/GraphQL.main";
import { WhiskyList } from "./__generated__/WhiskyList";
import { GetWhisky } from "./__generated__/GetWhisky";

export type IWhiskyListResponse = {
  data: WhiskyList;
} & IMainGQLResponse;

export type IWhiskyResponse = IMainGQLResponse & {
  data: GetWhisky;
};
