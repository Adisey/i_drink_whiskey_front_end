/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PagesListTree
// ====================================================

export interface PagesListTree_pagesListTree_countries_regions_distilleries_whiskies {
  __typename: "PageWhiskyGraphQLModel";
  id: string;
  name: string | null;
  description: string | null;
}

export interface PagesListTree_pagesListTree_countries_regions_distilleries {
  __typename: "PageTreeDistilleryGraphQLModel";
  id: string;
  name: string | null;
  description: string | null;
  whiskies: PagesListTree_pagesListTree_countries_regions_distilleries_whiskies[];
}

export interface PagesListTree_pagesListTree_countries_regions {
  __typename: "PageTreeRegionGraphQLModel";
  id: string;
  name: string | null;
  description: string | null;
  distilleries: PagesListTree_pagesListTree_countries_regions_distilleries[];
}

export interface PagesListTree_pagesListTree_countries {
  __typename: "PageTreeCountryGraphQLModel";
  id: string;
  name: string | null;
  description: string | null;
  regions: PagesListTree_pagesListTree_countries_regions[];
}

export interface PagesListTree_pagesListTree {
  __typename: "PagesTreeGraphQLModel";
  countries: PagesListTree_pagesListTree_countries[];
}

export interface PagesListTree {
  pagesListTree: PagesListTree_pagesListTree;
}
