/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetWhisky
// ====================================================

export interface GetWhisky_getWhisky {
  __typename: "WhiskyGraphQLModel";
  id: string;
  name: string | null;
  description: string | null;
  countryId: string | null;
  country: string | null;
  regionId: string | null;
  region: string | null;
  age: number | null;
  distilleryId: string | null;
  distillery: string | null;
}

export interface GetWhisky {
  getWhisky: GetWhisky_getWhisky;
}

export interface GetWhiskyVariables {
  id: string;
}
