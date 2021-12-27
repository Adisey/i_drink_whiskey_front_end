/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetDistillery
// ====================================================

export interface GetDistillery_getDistillery_children {
  __typename: "MainGraphQLModel";
  id: string;
  name: string | null;
}

export interface GetDistillery_getDistillery {
  __typename: "DistilleryChildrenGraphQLModel";
  id: string;
  name: string | null;
  description: string | null;
  countryId: string | null;
  country: string | null;
  regionId: string | null;
  region: string | null;
  children: GetDistillery_getDistillery_children[];
}

export interface GetDistillery {
  getDistillery: GetDistillery_getDistillery;
}

export interface GetDistilleryVariables {
  id: string;
}
