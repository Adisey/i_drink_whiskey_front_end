import * as Apollo from "@apollo/client";
import { gql } from "@apollo/client";

const allPage = gql`
  query pagesList {
    pagesList {
      id
      name
    }
  }
`;

export function useAllPages() {
  const options = {};
  return Apollo.useQuery(allPage, options);
}
