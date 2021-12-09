import { MenuItem } from "../interfaces/menu.interface";

export const getMenu = (): MenuItem[] => [
  {
    id: { secondCategory: "Second 1" },
    pages: [
      {
        id: "1",
        title: "Second 1 - P1",
        alias: "1",
        category: "Second 1",
      },
      {
        id: "2",
        title: "Second 1 - P2",
        alias: "2",
        category: "Second 1",
      },
    ],
  },
  {
    id: { secondCategory: "Second 2" },
    pages: [
      {
        id: "3",
        title: "Second 2 - P3",
        alias: "3",
        category: "Second 2",
      },
      {
        id: "4",
        title: "Second 2 - P4",
        alias: "4",
        category: "Second 2",
      },
    ],
  },
];
