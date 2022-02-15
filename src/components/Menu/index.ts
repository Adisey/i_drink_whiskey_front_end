import {
  PagesListTree_pagesListTree_countries,
  PagesListTree_pagesListTree_countries_regions,
  PagesListTree_pagesListTree_countries_regions_distilleries,
  PagesListTree_pagesListTree_countries_regions_distilleries_whiskies,
} from "../../domains/menu/graphql/__generated__/PagesListTree";
import { IDivMainProps } from "../../interfaces/HTML.elements/div.main.props";
import { getWhiskyPatch } from "domains/whisky/tools";
import { getDistilleryPatch } from "domains/distillery/tools";
import { getRegionPatch } from "../../domains/region";
import { getCountryPatch } from "domains/country/tools";

export interface IMenuItem extends IDivMainProps {
  id: string;
  name: string;
  patch: string;
  children?: IMenuItem[];
  setIsActiveParent?: (value: boolean) => void;
  setIsOpenParent?: (value: boolean) => void;
}

export interface IMenuChildrenList extends IDivMainProps {
  isOpen: boolean;
  setIsActiveParent?: (value: boolean) => void;
  setIsOpenParent?: (value: boolean) => void;
  children?: IMenuItem[];
}

const makeMenuWhisky = (
  items: PagesListTree_pagesListTree_countries_regions_distilleries_whiskies[]
): IMenuItem[] => {
  return (
    items?.map(
      (
        i: PagesListTree_pagesListTree_countries_regions_distilleries_whiskies
      ) => ({
        id: i.id,
        name: i.name || i.id,
        patch: getWhiskyPatch(i),
      })
    ) || []
  );
};

const makeMenuDistillery = (
  items: PagesListTree_pagesListTree_countries_regions_distilleries[]
): IMenuItem[] => {
  return (
    items?.map(
      (i: PagesListTree_pagesListTree_countries_regions_distilleries) => ({
        id: i.id,
        name: i.name || i.id,
        patch: getDistilleryPatch(i),
        children: makeMenuWhisky(i.whiskies),
      })
    ) || []
  );
};

const makeMenuRegion = (
  items: PagesListTree_pagesListTree_countries_regions[]
): IMenuItem[] => {
  return (
    items?.map((i: PagesListTree_pagesListTree_countries_regions) => ({
      id: i.id,
      name: i.name || i.id,
      patch: getRegionPatch(i),
      children: makeMenuDistillery(i.distilleries),
    })) || []
  );
};

export const makeMenuCountries = (
  items: PagesListTree_pagesListTree_countries[]
): IMenuItem[] => {
  return (
    items?.map((i: PagesListTree_pagesListTree_countries) => ({
      id: i.id,
      name: i.name || i.id,
      patch: getCountryPatch(i),
      children: makeMenuRegion(i.regions),
    })) || []
  );
};
