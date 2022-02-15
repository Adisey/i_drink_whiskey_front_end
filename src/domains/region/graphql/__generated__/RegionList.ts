/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RegionList
// ====================================================

export interface RegionList_regionsList_list {
  __typename: "RegionGraphQLModel";
  id: string;
  name: string | null;
  description: string | null;
  countryId: string | null;
  country: string | null;
}

export interface RegionList_regionsList {
  __typename: "RegionsGraphQLListModel";
  list: RegionList_regionsList_list[];
  totalCount: number;
}

export interface RegionList {
  regionsList: RegionList_regionsList;
}
