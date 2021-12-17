//Core
import React from "react";
import { useRouter } from "next/router";
import nextWithApollo from "next-with-apollo";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
//Other
import { settings } from "../../settings";

export const graphqlClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: `http://${settings.backendHost}/graphql`,
  }),
  ssrMode: typeof window === "undefined",
});

export const withApollo = nextWithApollo(
  ({ initialState, headers }) => {
    // ToDo: 17.12.2021 - check header
    // return new ApolloClient({
    //   ssrMode: typeof window === "undefined",
    //   link: new HttpLink({
    //     uri: `http://${settings.backendHost}/graphql`,
    //   }),
    //   headers: {
    //     ...(headers as Record<string, string>),
    //   },
    //   cache: new InMemoryCache().restore(initialState || {}),
    // });
    return graphqlClient;
  },
  {
    render: ({ Page, props }) => {
      const router = useRouter();
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} {...router} />
        </ApolloProvider>
      );
    },
  }
);
