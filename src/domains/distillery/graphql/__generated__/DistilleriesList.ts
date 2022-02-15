/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DistilleriesList
// ====================================================

export interface DistilleriesList_distilleriesList_list {
  __typename: "DistilleryGraphQLModel";
  id: string;
  name: string | null;
  description: string | null;
  countryId: string | null;
  country: string | null;
  regionId: string | null;
  region: string | null;
}

export interface DistilleriesList_distilleriesList {
  __typename: "DistilleriesGraphQLListModel";
  list: DistilleriesList_distilleriesList_list[];
  totalCount: number;
}

export interface DistilleriesList {
  distilleriesList: DistilleriesList_distilleriesList;
}
