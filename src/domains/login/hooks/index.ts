import { staticApolloClient } from "apolloClient";
import LoginGQL from "domains/login/graphql/login.graphql";
import { LoginAPIVariables, LoginAPI } from "../../";

export const loginGQL = async ({
  email,
  password,
}: LoginAPIVariables): Promise<LoginAPI> => {
  const { data } = await staticApolloClient.mutate({
    mutation: LoginGQL,
    variables: { email, password },
  });
  return data;
};
