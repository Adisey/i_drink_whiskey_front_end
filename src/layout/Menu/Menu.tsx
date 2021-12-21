import React from "react";
import Link from "next/link";
import {
  ITempCountry,
  ITempDistillery,
  ITempRegion,
  ITempWhisky,
} from "../../api/menu";
import { withApollo, useMenu } from "../../api";
import { getWhiskyPatch } from "../../domains/whisky";
import cx from "classnames";
import Styles from "./Menu.module.scss";

interface IPageProps {
  asPath: string;
}

const Menu = ({ asPath }: IPageProps): JSX.Element => {
  const { loading, data } = useMenu();
  const menu = data?.pagesListTree.countries;
  if (loading) {
    return <div>Loading..</div>;
  }

  const fourthMenu = (ws: ITempWhisky[]) => (
    <>
      {ws.map((w: ITempWhisky) => {
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

  const thirdMenu = (ds: ITempDistillery[]) => (
    <>
      {ds.map((d: ITempDistillery) => (
        <div key={d.id} className={Styles.thirdLevel}>
          {d.name}
          {d.whiskies && d.whiskies.length && fourthMenu(d.whiskies)}
        </div>
      ))}
    </>
  );
  const secondMenu = (rs: ITempRegion[]) => (
    <>
      {rs.map((r: ITempRegion) => (
        <div key={r.id} className={Styles.secondLevel}>
          {r.name}
          {r.distilleries && r.distilleries.length && thirdMenu(r.distilleries)}
        </div>
      ))}
    </>
  );

  const MainMenu = menu.map((c: ITempCountry) => (
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
