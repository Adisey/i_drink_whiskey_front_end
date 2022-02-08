import { IMainGQLResponse } from "interfaces/GraphQL.main";
import { WhiskyList } from "./__generated__/WhiskyList";
import { GetWhiskyId } from "./__generated__/GetWhiskyId";

export type IWhiskyListResponse = {
  data: WhiskyList;
} & IMainGQLResponse;

export type IWhiskyResponse = IMainGQLResponse & {
  data: GetWhiskyId;
};
