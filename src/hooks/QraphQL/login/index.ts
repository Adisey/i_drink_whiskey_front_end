import { graphqlClient } from "api/apolloClient";
import LoginGQL from "./login.graphql";
import { LoginAPIVariables, LoginAPI } from "./__generated__/LoginAPI";

export const loginGQL = async ({
  email,
  password,
}: LoginAPIVariables): Promise<LoginAPI> => {
  const { data } = await graphqlClient.mutate({
    mutation: LoginGQL,
    variables: { email, password },
  });
  return data;
};
