import { IMainItem } from "../../interfaces/GraphQL.main";

export const getWhiskyPatch = (w: IMainItem): string => `/whisky/${w.id}`;
