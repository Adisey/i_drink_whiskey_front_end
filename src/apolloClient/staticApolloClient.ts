import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { settings } from "settings";

export const staticApolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: `http://${settings.backendHost}/graphql`,
  }),
  ssrMode: typeof window === "undefined",
});
