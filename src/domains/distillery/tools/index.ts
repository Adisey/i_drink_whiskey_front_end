import { IMainItem } from "../../";

export const getDistilleryPatch = (w: IMainItem): string =>
  `/distillery/${w.id}`;
