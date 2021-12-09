import { PageItem } from "../interfaces/menu.interface";

export const getPage = (id: string): PageItem => {
  return { id: id, title: `Page ${id}`, alias: `${id}`, category: "xxx" };
};
