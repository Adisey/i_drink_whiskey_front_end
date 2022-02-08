/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetWhiskyId
// ====================================================

export interface GetWhiskyId_getWhiskyId {
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

export interface GetWhiskyId {
  getWhiskyId: GetWhiskyId_getWhiskyId;
}

export interface GetWhiskyIdVariables {
  id: string;
}
