import { IMainItem } from "../../";

export const getRegionPatch = (w: IMainItem): string => `/region/${w.id}`;
