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
//Styles
import cx from "classnames";
import Styles from "./Menu.module.scss";

interface IMenu extends IDivMainProps {
  countries: PagesListTree_pagesListTree_countries[];
}

const Menu: React.FC<IMenu> = ({
  countries,
  className,
  ...props
}: IMenu): JSX.Element => {
  const { asPath } = useRouter();

  const fourthMenu = (
    ws: PagesListTree_pagesListTree_countries_regions_distilleries_whiskies[]
  ) => (
    <>
      {ws.map(
        (
          w: PagesListTree_pagesListTree_countries_regions_distilleries_whiskies
        ) => {
          const patch = getWhiskyPatch(w);
          return (
            <div
              key={w.id}
              className={cx(Styles.fourthLevel, {
                [Styles.active]: patch === asPath,
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

  const thirdMenu = (
    ds: PagesListTree_pagesListTree_countries_regions_distilleries[]
  ) => (
    <>
      {ds.map(
        (d: PagesListTree_pagesListTree_countries_regions_distilleries) => {
          const patch = getDistilleryPatch(d);
          return (
            <div
              key={d.id}
              className={cx(Styles.thirdLevel, {
                [Styles.active]: patch === asPath,
              })}
            >
              <Link href={patch}>
                <a>
                  {d.name} {d.whiskies.length ? `- (${d.whiskies.length})` : ""}
                </a>
              </Link>
              {d.whiskies && d.whiskies.length && fourthMenu(d.whiskies)}
            </div>
          );
        }
      )}
    </>
  );
  const secondMenu = (rs: PagesListTree_pagesListTree_countries_regions[]) => (
    <>
      {rs.map((r: PagesListTree_pagesListTree_countries_regions) => (
        <div key={r.id} className={Styles.secondLevel}>
          {r.name}
          {r.distilleries && r.distilleries.length && thirdMenu(r.distilleries)}
        </div>
      ))}
    </>
  );

  const MainMenu = countries?.map(
    (c: PagesListTree_pagesListTree_countries) => (
      <div key={c.id} className={Styles.firstLevel}>
        {c.name}
        {c.regions && c.regions.length && secondMenu(c.regions)}
      </div>
    )
  );

  return (
    <nav {...props} className={cx(Styles.menu, className)} role="navigation">
      {MainMenu}
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
