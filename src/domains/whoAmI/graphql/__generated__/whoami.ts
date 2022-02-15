/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Whoami
// ====================================================

export interface Whoami_whoami {
  __typename: "UserGraphQLModel";
  email: string;
  /**
   * Only for Admin
   */
  role: string | null;
}

export interface Whoami {
  /**
   * Only for registered users!
   */
  whoami: Whoami_whoami;
}
