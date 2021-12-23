import { IMainItem } from "../../interfaces/GraphQL.main";

export const getDistilleryPatch = (w: IMainItem): string =>
  `/distillery/${w.id}`;
