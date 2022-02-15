import { IMainItem } from "../../";

export const getWhiskyPatch = (w: IMainItem): string => `/whisky/${w.id}`;
