/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: whoami
// ====================================================

export interface whoami_whoami {
  __typename: "UserGraphQLModel";
  email: string;
  /**
   * Only for Admin
   */
  role: string | null;
}

export interface whoami {
  /**
   * Only for registered users!
   */
  whoami: whoami_whoami;
}
