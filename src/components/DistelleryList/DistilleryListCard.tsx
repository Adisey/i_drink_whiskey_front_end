//Core
import React from "react";
import Link from "next/link";
import cx from "classnames";
//Interfaces
import { IDivMainProps } from "../../interfaces/HTML.elements/div.main.props";
import { GetDistillery_getDistillery } from "../../hooks/QraphQL/distillery/__generated__/GetDistillery";
//Utils
import { getDistilleryPatch } from "../../domains/distillery";
//Styles
import Styles from "./DistilleryListCard.module.scss";

interface IWhiskeyListCard extends IDivMainProps {
  distillery: GetDistillery_getDistillery;
}

export const DistilleryListCard: React.FC<IWhiskeyListCard> = ({
  className,
  distillery,
  ...props
}: IWhiskeyListCard) => {
  return (
    <div className={cx(className, Styles.main)} {...props}>
      <Link href={getDistilleryPatch(distillery)}>
        <a className={cx(Styles.link)}>{distillery.name}</a>
      </Link>
      <div className={cx(Styles.info)}>{distillery.id}</div>
    </div>
  );
};
