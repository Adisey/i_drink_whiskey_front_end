/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetWhiskyById
// ====================================================

export interface GetWhiskyById_getWhiskyById {
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

export interface GetWhiskyById {
  getWhiskyById: GetWhiskyById_getWhiskyById;
}

export interface GetWhiskyByIdVariables {
  id: string;
}
