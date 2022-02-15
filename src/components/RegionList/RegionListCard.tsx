//Core
import React from "react";
import Link from "next/link";
import cx from "classnames";
//Interfaces
import { IDivMainProps } from "../../interfaces/HTML.elements/div.main.props";
import { RegionList_regionsList_list } from "../../domains/region/graphql/__generated__/RegionList";
//Utils
import { getRegionPatch } from "../../domains/region";
//Styles
import Styles from "./RegionListCard.module.scss";

interface IWhiskeyListCard extends IDivMainProps {
  region: RegionList_regionsList_list;
}

export const RegionListCard: React.FC<IWhiskeyListCard> = ({
  className,
  region,
  ...props
}: IWhiskeyListCard) => {
  return (
    <div className={cx(className, Styles.main)} {...props}>
      <Link href={getRegionPatch(region)}>
        <a className={cx(Styles.link)}>{region.name}</a>
      </Link>
      <div className={cx(Styles.info)}>{region.id}</div>
    </div>
  );
};
