import React, { useEffect, useState } from "react";
import { IDivMainProps } from "interfaces/HTML.elements/div.main.props";
import cx from "classnames";
import Styles from "components/Menu/Menu.module.scss";
import Link from "next/link";
import Arrow from "components/Menu/arrow.svg";
import { useRouter } from "next/router";
import {
  PagesListTree_pagesListTree_countries,
  PagesListTree_pagesListTree_countries_regions,
  PagesListTree_pagesListTree_countries_regions_distilleries,
} from "hooks/QraphQL/menu/__generated__/PagesListTree";
import { getCountryPatch } from "domains/country";
import { getRegionPatch } from "domains/region";
import { getWhiskyPatch } from "domains/whisky";
import { getDistilleryPatch } from "domains/distillery";

export const makeMenuWhisky = (
  items: PagesListTree_pagesListTree_countries_regions_distilleries[]
): ITempMenuItem[] => {
  return (
    items?.map(
      (i: PagesListTree_pagesListTree_countries_regions_distilleries) => ({
        id: i.id,
        name: i.name || i.id,
        patch: getWhiskyPatch(i),
      })
    ) || []
  );
};

export const makeMenuDistillery = (
  items: PagesListTree_pagesListTree_countries_regions_distilleries[]
): ITempMenuItem[] => {
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

export const makeMenuRegion = (
  items: PagesListTree_pagesListTree_countries_regions[]
): ITempMenuItem[] => {
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
): ITempMenuItem[] => {
  return (
    items?.map((i: PagesListTree_pagesListTree_countries) => ({
      id: i.id,
      name: i.name || i.id,
      patch: getCountryPatch(i),
      children: makeMenuRegion(i.regions),
    })) || []
  );
};

interface ITempMenuItem extends IDivMainProps {
  id: string;
  name: string;
  patch: string;
  children?: ITempMenuItem[];
  setIsActiveParent?: (value: boolean) => void;
}

export const NewMenuItem: React.FC<ITempMenuItem> = ({
  id,
  name,
  patch,
  children,
  setIsActiveParent,
  className,
  ...props
}: ITempMenuItem) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isActiveItem, setIsActiveItem] = useState<boolean>(false);
  const [isActiveChildren, setIsActiveChildren] = useState<boolean>(false);
  const { asPath } = useRouter();

  useEffect(() => {
    const itIsMy = asPath === patch;
    if (itIsMy !== isActiveItem) {
      setIsActiveItem(itIsMy);
      setIsActiveParent && setIsActiveParent(itIsMy);
    }
  });

  console.log(
    +new Date(),
    "-(Item)->",
    "isOpen->",
    isOpen,
    "isActiveItem->",
    isActiveItem,
    name,
    children?.length
  );

  const isChildren = !!children?.length;

  const myChildrenIsActive = (isActive: boolean) => {
    console.log(
      +new Date(),
      "-(myChildrenIsActive)->",
      "isOpen->",
      isOpen,
      "isActiveItem->",
      isActiveItem,
      name,
      children?.length
    );
    setIsActiveChildren(isActive);
    setIsActiveParent && setIsActiveParent(isActive);
  };

  return (
    <div key={id} className={cx(Styles.countryMenuItem, className)} {...props}>
      <div
        className={cx(Styles.menuItem, {
          [Styles.menuOpenItem]: isOpen,
          [Styles.menuActiveItem]: isActiveItem || isActiveChildren,
        })}
      >
        <div className={Styles.title}>
          <Link href={patch}>
            <a>
              {name} {children?.length ? `- (${children.length})` : ""}
            </a>
          </Link>
        </div>
        {isChildren ? (
          <Arrow className={Styles.icon} onClick={() => setIsOpen(!isOpen)} />
        ) : null}
      </div>
      {isChildren ? (
        <MenuList
          isOpen={isOpen}
          children={children}
          setIsActiveParent={myChildrenIsActive}
        />
      ) : null}
    </div>
  );
};

interface IChildrenList extends IDivMainProps {
  isOpen: boolean;
  setIsActiveParent?: (value: boolean) => void;
  children?: ITempMenuItem[];
}

export const MenuList: React.FC<IChildrenList> = ({
  children,
  isOpen,
  setIsActiveParent,
  className,
  ...props
}: IChildrenList) => {
  console.log(+new Date(), "-(MenuList)->", children?.length, children);
  return (
    <div
      className={cx(Styles.childrenList, className, {
        [Styles.hideList]: !isOpen,
      })}
      {...props}
    >
      {children?.map((item: ITempMenuItem) => {
        return (
          <NewMenuItem
            key={item.id}
            {...item}
            setIsActiveParent={setIsActiveParent}
          />
        );
      })}
    </div>
  );
};
