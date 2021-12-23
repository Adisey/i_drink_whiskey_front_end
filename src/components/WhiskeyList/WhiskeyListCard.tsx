//Core
import React from "react";
import Link from "next/link";
import cx from "classnames";
//Interfaces
import { IDivMainProps } from "../../interfaces/HTML.elements/div.main.props";
import { IWhiskyItem } from "../../interfaces/whisky";
//Utils
import { getWhiskyPatch } from "../../domains/whisky";
//Styles
import Styles from "./WhiskeyListCard.module.scss";

interface IWhiskeyListCard extends IDivMainProps {
  whisky: IWhiskyItem;
}

export const WhiskeyListCard: React.FC<IWhiskeyListCard> = ({
  className,
  whisky,
  ...props
}: IWhiskeyListCard) => {
  return (
    <div className={cx(className, Styles.main)} {...props}>
      <Link href={getWhiskyPatch(whisky)}>
        <a className={cx(Styles.link)}>{whisky.name}</a>
      </Link>
      <div className={cx(Styles.info)}>
        {whisky.age} {whisky.id}
      </div>
    </div>
  );
};
