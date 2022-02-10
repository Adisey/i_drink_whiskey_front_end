import React, { useEffect, useState } from "react";
import { IDivMainProps } from "interfaces/HTML.elements/div.main.props";
import {
  PagesListTree_pagesListTree_countries,
  PagesListTree_pagesListTree_countries_regions,
  PagesListTree_pagesListTree_countries_regions_distilleries,
  PagesListTree_pagesListTree_countries_regions_distilleries_whiskies,
} from "hooks/QraphQL/menu/__generated__/PagesListTree";
import cx from "classnames";
import Styles from "components/Menu/Menu.module.scss";
import { useRouter } from "next/router";
import { getWhiskyPatch } from "domains/whisky";
import { getDistilleryPatch } from "domains/distillery";
import Link from "next/link";
import Arrow from "components/Menu/arrow.svg";

//--- WhiskyMenuItem -------------------------------------------------------------------------
interface IWhiskyMenuItem extends IDivMainProps {
  isActive?: boolean;
  item: PagesListTree_pagesListTree_countries_regions_distilleries_whiskies;
}

const WhiskyMenuItem: React.FC<IWhiskyMenuItem> = ({
  item,
  isActive,
  className,
  ...props
}: IWhiskyMenuItem): JSX.Element => {
  const patch = getWhiskyPatch(item);
  // console.log(
  //   +new Date(),
  //   `--(Whisky)-  ->`,
  //   item.name,
  //   "Active->",
  //   isActive,
  //   item
  // );
  return (
    <div
      key={item.id}
      className={cx(
        Styles.menuItem,
        Styles.whiskyMenuItem,
        { [Styles.menuOpenItem]: isActive, [Styles.menuActiveItem]: isActive },
        className
      )}
      {...props}
    >
      <div className={Styles.title}>
        <Link href={patch}>
          <a>{item.name}</a>
        </Link>
      </div>
    </div>
  );
};

//--- DistilleryMenuItem -------------------------------------------------------------------------

interface IDistilleryMenuItem extends IDivMainProps {
  item: PagesListTree_pagesListTree_countries_regions_distilleries;
  setIsActiveParent: (value: boolean) => void;
}

const DistilleryMenuItem: React.FC<IDistilleryMenuItem> = ({
  item,
  className,
  setIsActiveParent,
  ...props
}: IDistilleryMenuItem): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const { asPath } = useRouter();
  const patch = getDistilleryPatch(item);
  const { id, name, whiskies } = item;

  const WhiskeyList = (
    <div className={cx(Styles.whiskyList, { [Styles.hideList]: !isOpen })}>
      {whiskies.map(
        (
          item: PagesListTree_pagesListTree_countries_regions_distilleries_whiskies
        ) => {
          const patch = getWhiskyPatch(item);
          return (
            <WhiskyMenuItem
              key={item.id}
              item={item}
              isActive={patch === asPath}
            />
          );
        }
      )}
    </div>
  );

  useEffect(() => {
    if (asPath === patch) {
      setIsActive(true);
      setIsActiveParent(true);
    } else {
      const foundActive = whiskies
        .map(
          (
            i: PagesListTree_pagesListTree_countries_regions_distilleries_whiskies
          ): boolean => asPath === getWhiskyPatch(i)
        )
        .reduce((res: boolean, i: boolean) => res || i);

      if (foundActive) {
        setIsActive(true);
        setIsActiveParent(true);
      }
    }
  }, [asPath, patch, whiskies]);

  useEffect(() => {
    if (asPath === patch) {
      setIsOpen(true);
      setIsActive(true);
    } else {
      const foundActive = whiskies
        .map(
          (
            i: PagesListTree_pagesListTree_countries_regions_distilleries_whiskies
          ): boolean => asPath === getWhiskyPatch(i)
        )
        .reduce((res: boolean, i: boolean) => res || i);

      if (foundActive) {
        setIsOpen(true);
        setIsActive(true);
      }
    }
  }, []);
  // console.log(
  //   +new Date(),
  //   `--(Distillery)-  ->`,
  //   "Active->",
  //   isActive,
  //   "Open->",
  //   isOpen,
  //   item.name,
  //   item
  // );
  return (
    <div
      key={id}
      className={cx(Styles.distilleryMenuItem, className)}
      {...props}
    >
      <div
        className={cx(Styles.menuItem, {
          [Styles.menuOpenItem]: isOpen,
          [Styles.menuActiveItem]: isActive,
        })}
      >
        <div className={Styles.title}>
          <Link href={patch}>
            <a>
              {name} {whiskies.length ? `- (${whiskies.length})` : ""}
            </a>
          </Link>
        </div>
        <Arrow className={Styles.icon} onClick={() => setIsOpen(!isOpen)} />
      </div>
      {WhiskeyList}
    </div>
  );
};

//--- RegionMenuItem -------------------------------------------------------------------------

interface IRegionMenuItem extends IDivMainProps {
  item: PagesListTree_pagesListTree_countries_regions;
  setIsActiveParent: (value: boolean) => void;
}

const RegionMenuItem: React.FC<IRegionMenuItem> = ({
  item,
  className,
  setIsActiveParent,
  ...props
}: IRegionMenuItem): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const { asPath } = useRouter();
  const patch = getDistilleryPatch(item);
  const { id, name, distilleries } = item;

  const setAllIsActive = () => {
    setIsActive(true);
    setIsActiveParent(true);
  };

  const DistilleryList = (
    <div className={cx(Styles.distilleryList, { [Styles.hideList]: !isOpen })}>
      {distilleries.map(
        (item: PagesListTree_pagesListTree_countries_regions_distilleries) => {
          const patch = getWhiskyPatch(item);
          return (
            <DistilleryMenuItem
              key={item.id}
              item={item}
              setIsActiveParent={() => setAllIsActive()}
            />
          );
        }
      )}
    </div>
  );

  useEffect(() => {
    if (asPath === patch) {
      setAllIsActive();
    } else {
      const foundActive = distilleries
        .map(
          (
            i: PagesListTree_pagesListTree_countries_regions_distilleries
          ): boolean => asPath === getWhiskyPatch(i)
        )
        .reduce((res: boolean, i: boolean) => res || i);

      if (foundActive) {
        setAllIsActive();
      }
    }
  }, [asPath, patch, distilleries]);

  useEffect(() => {
    if (asPath === patch) {
      setIsOpen(true);
    } else {
      const foundActive = distilleries
        .map(
          (
            i: PagesListTree_pagesListTree_countries_regions_distilleries
          ): boolean => asPath === getWhiskyPatch(i)
        )
        .reduce((res: boolean, i: boolean) => res || i);

      if (foundActive) {
        setIsOpen(true);
      }
    }
  }, []);
  // console.log(
  //   +new Date(),
  //   `--(Region)-  ->`,
  //   item.name,
  //   "Active->",
  //   isActive,
  //   "Open->",
  //   isOpen,
  //
  //   item
  // );
  return (
    <div key={id} className={cx(Styles.regionMenuItem, className)} {...props}>
      <div
        className={cx(Styles.menuItem, {
          [Styles.menuOpenItem]: isOpen,
          [Styles.menuActiveItem]: isActive,
        })}
      >
        <div className={Styles.title}>
          <Link href={patch}>
            <a>
              {name} {distilleries.length ? `- (${distilleries.length})` : ""}
            </a>
          </Link>
        </div>
        <Arrow className={Styles.icon} onClick={() => setIsOpen(!isOpen)} />
      </div>
      {DistilleryList}
    </div>
  );
};

//--- CountryMenuItem -------------------------------------------------------------------------

interface ICountryMenuItem extends IDivMainProps {
  item: PagesListTree_pagesListTree_countries;
}

const CountryMenuItem: React.FC<ICountryMenuItem> = ({
  item,
  className,
  ...props
}: ICountryMenuItem): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const { asPath } = useRouter();
  const patch = getDistilleryPatch(item);
  const { id, name, regions } = item;

  const RegionList = (
    <div className={cx(Styles.regionList, { [Styles.hideList]: !isOpen })}>
      {regions.map((item: PagesListTree_pagesListTree_countries_regions) => {
        const patch = getWhiskyPatch(item);
        return (
          <RegionMenuItem
            key={item.id}
            item={item}
            setIsActiveParent={setIsActive}
          />
        );
      })}
    </div>
  );

  useEffect(() => {
    if (asPath === patch) {
      setIsActive(true);
    } else {
      const foundActive = regions
        .map(
          (i: PagesListTree_pagesListTree_countries_regions): boolean =>
            asPath === getWhiskyPatch(i)
        )
        .reduce((res: boolean, i: boolean) => res || i);

      if (foundActive) {
        setIsActive(true);
      }
    }
  }, [asPath, patch, regions]);

  useEffect(() => {
    if (asPath === patch) {
      setIsOpen(true);
      setIsActive(true);
    } else {
      const foundActive = regions
        .map(
          (i: PagesListTree_pagesListTree_countries_regions): boolean =>
            asPath === getWhiskyPatch(i)
        )
        .reduce((res: boolean, i: boolean) => res || i);

      if (foundActive) {
        setIsOpen(true);
        setIsActive(true);
      }
    }
  }, []);
  // console.log(
  //   +new Date(),
  //   `--(Country)-  ->`,
  //   item.name,
  //   "Active->",
  //   isActive,
  //   "Open->",
  //   isOpen,
  //   item
  // );
  return (
    <div key={id} className={cx(Styles.countryMenuItem, className)} {...props}>
      <div
        className={cx(Styles.menuItem, {
          [Styles.menuOpenItem]: isOpen,
          [Styles.menuActiveItem]: isActive,
        })}
      >
        <div className={Styles.title}>
          <Link href={patch}>
            <a>
              {name} {regions.length ? `- (${regions.length})` : ""}
            </a>
          </Link>
        </div>
        <Arrow className={Styles.icon} onClick={() => setIsOpen(!isOpen)} />
      </div>
      {RegionList}
    </div>
  );
};
//--- CountryMenu -------------------------------------------------------------------------

interface ICountryMenu extends IDivMainProps {
  items: PagesListTree_pagesListTree_countries[];
}

export const CountryMenu: React.FC<ICountryMenu> = ({
  items,
  className,
  ...props
}: ICountryMenu): JSX.Element => {
  const CountryList = items.map(
    (item: PagesListTree_pagesListTree_countries) => (
      <CountryMenuItem key={item.id} item={item} />
    )
  );

  return (
    <div className={cx(Styles.countryMenu, className)} {...props}>
      {CountryList}
    </div>
  );
};
