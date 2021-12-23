import React from "react";
import Link from "next/link";
import { withApollo } from "../../api/apolloClient";
import { getWhiskyPatch } from "../../domains/whisky";
import cx from "classnames";
import Styles from "./Menu.module.scss";
import {
  IMenuCountry,
  IMenuDistillery,
  IMenuRegion,
  IMenuWhisky,
} from "interfaces/menu";
import { useMenu } from "../../hooks/QraphQL/menu";
import { getDistilleryPatch } from "../../domains/distillery";

interface IPageProps {
  asPath: string;
}

const Menu = ({ asPath }: IPageProps): JSX.Element => {
  const { loading, data } = useMenu();
  const menu = data?.pagesListTree.countries;
  if (loading) {
    return <div>Loading..</div>;
  }

  const fourthMenu = (ws: IMenuWhisky[]) => (
    <>
      {ws.map((w: IMenuWhisky) => {
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
      })}
    </>
  );

  const thirdMenu = (ds: IMenuDistillery[]) => (
    <>
      {ds.map((d: IMenuDistillery) => {
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
      })}
    </>
  );
  const secondMenu = (rs: IMenuRegion[]) => (
    <>
      {rs.map((r: IMenuRegion) => (
        <div key={r.id} className={Styles.secondLevel}>
          {r.name}
          {r.distilleries && r.distilleries.length && thirdMenu(r.distilleries)}
        </div>
      ))}
    </>
  );

  const MainMenu = menu.map((c: IMenuCountry) => (
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

export const MainMenu = withApollo(Menu);
