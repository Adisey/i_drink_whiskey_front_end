/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LoginAPI
// ====================================================

export interface LoginAPI_login {
  __typename: "AuthTokenGraphQLModel";
  access_token: string | null;
}

export interface LoginAPI {
  login: LoginAPI_login;
}

export interface LoginAPIVariables {
  email: string;
  password: string;
}
