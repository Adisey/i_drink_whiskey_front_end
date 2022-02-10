//Core
import React from "react";
import cx from "classnames";
//Interfaces
import { IDivMainProps } from "../../interfaces/HTML.elements/div.main.props";
import { RegionList_regionsList_list } from "../../hooks/QraphQL/region/__generated__/RegionList";
//Components
import { RegionListCard } from "./RegionListCard";
//Styles
import Styles from "./RegionList.module.scss";

interface IWhiskeyList extends IDivMainProps {
  regions: RegionList_regionsList_list[];
}

export const RegionList: React.FC<IWhiskeyList> = ({
  className,
  regions,
  ...props
}: IWhiskeyList) => {
  console.log(
    +new Date(),
    "-(RegionList)->",
    typeof regions,
    `-regions->`,
    regions
  );
  return (
    <div className={cx(className, Styles.main)} {...props}>
      <h2>RegionList</h2>
      <div className={cx(Styles.list)}>
        {regions?.map((w: RegionList_regionsList_list) => (
          <RegionListCard key={w.id} region={w} />
        ))}
      </div>
    </div>
  );
};
