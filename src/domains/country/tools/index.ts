import { IMainItem } from "domains/main/types";

export const getCountryPatch = (w: IMainItem): string => `/country/${w.id}`;
