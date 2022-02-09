//Core
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
//Interfaces
import {
  PagesListTree_pagesListTree_countries_regions_distilleries_whiskies,
  PagesListTree_pagesListTree_countries_regions_distilleries,
  PagesListTree_pagesListTree_countries_regions,
  PagesListTree_pagesListTree_countries,
} from "hooks/QraphQL/menu/__generated__/PagesListTree";
import { IDivMainProps } from "interfaces/HTML.elements/div.main.props";
//Other
import { useMenu } from "hooks/QraphQL/menu";
import { getDistilleryPatch } from "domains/distillery";
import { getWhiskyPatch } from "domains/whisky";
import { Loading } from "../";
import Arrow from "./arrow.svg";
//Styles
import cx from "classnames";
import Styles from "./Menu.module.scss";

interface IMenu extends IDivMainProps {
  countries: PagesListTree_pagesListTree_countries[];
}

interface ISubmenu {
  isChildrenOpen: boolean;
  items: JSX.Element;
}

const Menu: React.FC<IMenu> = ({
  countries,
  className,
  ...props
}: IMenu): JSX.Element => {
  const { asPath } = useRouter();

  const whiskiesMenu = (
    ws: PagesListTree_pagesListTree_countries_regions_distilleries_whiskies[]
  ): ISubmenu => {
    let isMyChildrenOpen = false;
    const items = (
      <>
        {ws.map(
          (
            w: PagesListTree_pagesListTree_countries_regions_distilleries_whiskies
          ) => {
            const patch = getWhiskyPatch(w);
            const isOpen = patch === asPath;
            isMyChildrenOpen = isMyChildrenOpen || isOpen;

            return (
              <div
                key={w.id}
                className={cx(Styles.fourthLevel, {
                  [Styles.active]: isOpen,
                })}
              >
                <Link href={patch}>
                  <a>{w.name}</a>
                </Link>
              </div>
            );
          }
        )}
      </>
    );
    return { isChildrenOpen: isMyChildrenOpen, items };
  };

  const distilleriesMenu = (
    ds: PagesListTree_pagesListTree_countries_regions_distilleries[]
  ): ISubmenu => {
    let isMyChildrenOpen = false;
    const items = (
      <>
        {ds.map(
          (d: PagesListTree_pagesListTree_countries_regions_distilleries) => {
            const patch = getDistilleryPatch(d);
            const isOpen = patch === asPath;
            const { isChildrenOpen, items } = whiskiesMenu(d.whiskies);
            isMyChildrenOpen = isMyChildrenOpen || isOpen || isChildrenOpen;

            return (
              <div key={d.id} className={Styles.thirdLevel}>
                <div
                  className={cx(Styles.menuItem, {
                    [Styles.menuOpenItem]: isOpen || isChildrenOpen,
                  })}
                >
                  <div className={Styles.title}>
                    <Link href={patch}>
                      <a>
                        {d.name}{" "}
                        {d.whiskies.length ? `- (${d.whiskies.length})` : ""}
                      </a>
                    </Link>
                  </div>
                  <Arrow className={Styles.icon} />
                </div>
                {items}
              </div>
            );
          }
        )}
      </>
    );

    return { isChildrenOpen: isMyChildrenOpen, items };
  };
  const regionsMenu = (
    rs: PagesListTree_pagesListTree_countries_regions[]
  ): ISubmenu => {
    let isMyChildrenOpen = false;
    const items = (
      <>
        {rs.map((r: PagesListTree_pagesListTree_countries_regions) => {
          const isOpen = false;
          const { isChildrenOpen, items } = distilleriesMenu(r.distilleries);
          isMyChildrenOpen = isMyChildrenOpen || isOpen || isChildrenOpen;

          return (
            <div key={r.id} className={Styles.secondLevel}>
              <div
                className={cx(Styles.menuItem, {
                  [Styles.menuOpenItem]: isOpen || isChildrenOpen,
                })}
              >
                <div className={Styles.title}>
                  <Link href={"#"}>
                    <a>
                      {r.name}{" "}
                      {r.distilleries.length
                        ? `- (${r.distilleries.length})`
                        : ""}
                    </a>
                  </Link>
                </div>
                <Arrow className={Styles.icon} />
              </div>
              {items}
            </div>
          );
        })}
      </>
    );

    return { isChildrenOpen: isMyChildrenOpen, items };
  };

  const CountriesMenu = countries?.map(
    (c: PagesListTree_pagesListTree_countries) => {
      const isOpen = false;
      const { isChildrenOpen, items } = regionsMenu(c.regions);
      return (
        <div key={c.id} className={Styles.firstLevel}>
          <div
            className={cx(Styles.menuItem, {
              [Styles.menuOpenItem]: isOpen || isChildrenOpen,
            })}
          >
            <div className={Styles.title}>
              <Link href={"#"}>
                <a>
                  {c.name} {c.regions.length ? `- (${c.regions.length})` : ""}
                </a>
              </Link>
            </div>
            <Arrow className={Styles.icon} />
          </div>
          {items}
        </div>
      );
    }
  );

  return (
    <nav {...props} className={cx(Styles.menu, className)} role="navigation">
      {CountriesMenu}
    </nav>
  );
};

const MenuDataWrapper: React.FC<IDivMainProps> = ({
  className,
  ...props
}): JSX.Element => {
  const [countries, setCountries] = useState([]);
  const { loading, data } = useMenu();

  useEffect(() => {
    if (!loading) {
      setCountries(data?.pagesListTree?.countries || []);
    }
  }, [loading, data]);

  return (
    <div {...props} className={cx(Styles.dataWrapper, className)}>
      <Loading isLoading={loading} />
      <Menu countries={countries} />
    </div>
  );
};

export const MainMenu: React.FC<IDivMainProps> = ({
  className,
  ...props
}): JSX.Element => {
  return (
    <div {...props} className={cx(Styles.mainMenu, className)}>
      <MenuDataWrapper />
    </div>
  );
};
