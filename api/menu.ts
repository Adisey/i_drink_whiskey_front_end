import { MenuItem } from "../interfaces/menu.interface";
import * as Apollo from "@apollo/client";
import { gql } from "@apollo/client";

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

const menuGQL = gql`
  query {
    pagesListTree {
      countries {
        id
        name
        description
        regions {
          id
          name
          description
          distilleries {
            id
            name
            description
            whiskies {
              id
              name
              description
            }
          }
        }
      }
    }
  }
`;

export function useMenu() {
  const options = {};
  return Apollo.useQuery(menuGQL, options) as IMenuResponse;
}

export type ITempCountry = {
  id: string;
  name: string;
  regions: ITempRegion[];
};

export type ITempRegion = {
  id: string;
  name: string;
  distilleries: ITempDistillery[];
};

export type ITempDistillery = {
  id: string;
  name: string;
  whiskies: ITempWhisky[];
};

export type ITempWhisky = {
  id: string;
  name: string;
};

type IMainGQLResponse = {
  loading: boolean;
  data: any;
};

type IMenuResponse = IMainGQLResponse & {
  data: {
    pagesListTree: {
      countries: ITempCountry[];
    };
  };
};
