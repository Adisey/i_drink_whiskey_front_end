import { ITempWhisky } from "../../api/menu";

export const getWhiskyPatch = (w: ITempWhisky): string => `/whisky/${w.id}`;
