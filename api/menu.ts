import * as Apollo from "@apollo/client";
import { gql } from "@apollo/client";

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

export type IMainGQLResponse = {
  loading: boolean;
  data: any;
};

export type IMenuResponse = IMainGQLResponse & {
  data: {
    pagesListTree: {
      countries: ITempCountry[];
    };
  };
};
