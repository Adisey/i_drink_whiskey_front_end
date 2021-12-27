/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: WhiskyList
// ====================================================

export interface WhiskyList_whiskyList_list {
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

export interface WhiskyList_whiskyList {
  __typename: "WhiskiesGraphQLListModel";
  list: WhiskyList_whiskyList_list[];
  totalCount: number;
}

export interface WhiskyList {
  whiskyList: WhiskyList_whiskyList;
}
