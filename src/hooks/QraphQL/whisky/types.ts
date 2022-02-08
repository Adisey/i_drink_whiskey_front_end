import { IMainGQLResponse } from "interfaces/GraphQL.main";
import { WhiskyList } from "./__generated__/WhiskyList";
import { GetWhiskyById } from "./__generated__/GetWhiskyById";

export type IWhiskyListResponse = {
  data: WhiskyList;
} & IMainGQLResponse;

export type IWhiskyResponse = IMainGQLResponse & {
  data: GetWhiskyById;
};
