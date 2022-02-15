/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetRegion
// ====================================================

export interface GetRegion_getRegion_children {
  __typename: "MainGraphQLModel";
  id: string;
  name: string | null;
}

export interface GetRegion_getRegion {
  __typename: "RegionChildrenGraphQLModel";
  id: string;
  name: string | null;
  description: string | null;
  countryId: string | null;
  country: string | null;
  children: GetRegion_getRegion_children[];
}

export interface GetRegion {
  getRegion: GetRegion_getRegion;
}

export interface GetRegionVariables {
  id: string;
}
