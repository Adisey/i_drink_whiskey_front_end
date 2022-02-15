import { GetWhiskyById, WhiskyList } from "../graphql";
import { IMainGQLResponse } from "../../";

export type IWhiskyListResponse = {
  data: WhiskyList;
} & IMainGQLResponse;

export type IWhiskyResponse = IMainGQLResponse & {
  data: GetWhiskyById;
};
