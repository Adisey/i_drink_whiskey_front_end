/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetDiscellery
// ====================================================

export interface GetDiscellery_getDistillery_children {
  __typename: "MainGraphQLModel";
  id: string | null;
  name: string;
}

export interface GetDiscellery_getDistillery {
  __typename: "DistilleryChildrenGraphQLModel";
  id: string | null;
  name: string;
  description: string | null;
  countryId: string | null;
  country: string | null;
  regionId: string | null;
  region: string | null;
  children: GetDiscellery_getDistillery_children[];
}

export interface GetDiscellery {
  getDistillery: GetDiscellery_getDistillery;
}

export interface GetDiscelleryVariables {
  id: string;
}
