import { WhiskyListVariables } from "../../whisky/graphql/__generated__/WhiskyList";

export type IMainGQLResponse = {
  loading: boolean;
  data: any;
};

export type IMainItem = {
  id: string;
  name: string | null;
};

export type IListVariables = WhiskyListVariables;
