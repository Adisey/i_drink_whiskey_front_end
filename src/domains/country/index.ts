import { IMainItem } from "../../interfaces/GraphQL.main";

export const getCountryPatch = (w: IMainItem): string => `/country/${w.id}`;
