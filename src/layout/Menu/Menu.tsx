//Core
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
//Interfaces
import {
  PagesListTree_pagesListTree_countries_regions_distilleries_whiskies,
  PagesListTree_pagesListTree_countries_regions_distilleries,
  PagesListTree_pagesListTree_countries_regions,
  PagesListTree_pagesListTree_countries,
} from "../../hooks/QraphQL/menu/__generated__/PagesListTree";
//Other
import { useMenu } from "../../hooks/QraphQL/menu";
import { getDistilleryPatch } from "../../domains/distillery";
import { getWhiskyPatch } from "../../domains/whisky";

//Styles
import cx from "classnames";
import Styles from "./Menu.module.scss";

export const Menu = (): JSX.Element => {
  const { loading, data } = useMenu();
  const { asPath } = useRouter();

  const menu = data?.pagesListTree.countries;
  if (loading) {
    return <div>Loading..</div>;
  }

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

  const MainMenu = menu.map((c: PagesListTree_pagesListTree_countries) => (
    <div key={c.id} className={Styles.firstLevel}>
      {c.name}
      {c.regions && c.regions.length && secondMenu(c.regions)}
    </div>
  ));
  return (
    <nav className={Styles.menu} role="navigation">
      {MainMenu}
    </nav>
  );
};
