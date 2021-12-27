//Core
import React from "react";
import Link from "next/link";
import cx from "classnames";
//Interfaces
import { IDivMainProps } from "../../interfaces/HTML.elements/div.main.props";
//Utils
import { getWhiskyPatch } from "../../domains/whisky";
//Styles
import Styles from "./WhiskeyListCard.module.scss";
import { GetDistillery_getDistillery_children } from "hooks/QraphQL/distillery/__generated__/GetDistillery";

interface IWhiskeyListCard extends IDivMainProps {
  whisky: GetDistillery_getDistillery_children;
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
      <div className={cx(Styles.info)}>{whisky.id}</div>
    </div>
  );
};
