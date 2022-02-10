import { IMainItem } from "../../interfaces/GraphQL.main";

export const getRegionPatch = (w: IMainItem): string => `/region/${w.id}`;
