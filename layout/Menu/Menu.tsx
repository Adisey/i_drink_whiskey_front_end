import { useMenu } from "../../api";
import {
  ITempCountry,
  ITempDistillery,
  ITempRegion,
  ITempWhisky,
} from "../../api/menu";
import cx from "classnames";
import Styles from "./Menu.module.scss";

export const Menu = (): JSX.Element => {
  const { loading, data } = useMenu();
  console.log(+new Date(), "-($$)->", typeof loading, `-loading->`, loading);
  const menu = data?.pagesListTree.countries;
  console.log(+new Date(), "-(********)->", typeof menu, `-menu->`, menu);
  if (loading) {
    return <div>Loading..</div>;
  }

  const fourthMenu = (ws: ITempWhisky[]) => (
    <>
      {ws.map((w: ITempWhisky) => (
        <div key={w.id} className={Styles.fourthLevel}>
          {w.name}
        </div>
      ))}
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
