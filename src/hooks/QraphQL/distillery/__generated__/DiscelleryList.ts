/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DiscelleryList
// ====================================================

export interface DiscelleryList_distilleriesList_list {
  __typename: "DistilleryGraphQLModel";
  id: string | null;
  name: string;
  description: string | null;
  countryId: string | null;
  country: string | null;
  regionId: string | null;
  region: string | null;
}

export interface DiscelleryList_distilleriesList {
  __typename: "DistilleriesGraphQLListModel";
  list: DiscelleryList_distilleriesList_list[];
  totalCount: number;
}

export interface DiscelleryList {
  distilleriesList: DiscelleryList_distilleriesList;
}
