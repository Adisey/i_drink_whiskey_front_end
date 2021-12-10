import * as Apollo from "@apollo/client";
import { gql } from "@apollo/client";

export const allPage = gql`
  query distilleriesList2 {
    distilleriesList2 {
      list {
        id
        name
      }
      totalCount
    }
  }
`;

export function useAllPages() {
  const options = {};
  return Apollo.useQuery(allPage, options);
}
