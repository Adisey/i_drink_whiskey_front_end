/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: pagesListTree
// ====================================================

export interface pagesListTree_pagesListTree_countries_regions_distilleries_whiskies {
  __typename: "PageWhiskyGraphQLModel";
  id: string | null;
  name: string;
  description: string | null;
}

export interface pagesListTree_pagesListTree_countries_regions_distilleries {
  __typename: "PageTreeDistilleryGraphQLModel";
  id: string | null;
  name: string;
  description: string | null;
  whiskies: pagesListTree_pagesListTree_countries_regions_distilleries_whiskies[];
}

export interface pagesListTree_pagesListTree_countries_regions {
  __typename: "PageTreeRegionGraphQLModel";
  id: string | null;
  name: string;
  description: string | null;
  distilleries: pagesListTree_pagesListTree_countries_regions_distilleries[];
}

export interface pagesListTree_pagesListTree_countries {
  __typename: "PageTreeCountryGraphQLModel";
  id: string | null;
  name: string;
  description: string | null;
  regions: pagesListTree_pagesListTree_countries_regions[];
}

export interface pagesListTree_pagesListTree {
  __typename: "PagesTreeGraphQLModel";
  countries: pagesListTree_pagesListTree_countries[];
}

export interface pagesListTree {
  pagesListTree: pagesListTree_pagesListTree;
}
