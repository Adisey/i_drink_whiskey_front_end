//Core
import React from "react";
import cx from "classnames";
//Interfaces
import { IDivMainProps } from "../../interfaces/HTML.elements/div.main.props";
import { GetDistillery_getDistillery_children } from "../../domains/distillery/graphql/__generated__/GetDistillery";
//Components
import { WhiskeyListCard } from "./WhiskeyListCard";
//Styles
import Styles from "./WhiskeyList.module.scss";

interface IWhiskeyList extends IDivMainProps {
  whiskyList?: GetDistillery_getDistillery_children[];
}

export const WhiskeyList: React.FC<IWhiskeyList> = ({
  className,
  whiskyList,
  ...props
}: IWhiskeyList) => {
  return (
    <div className={cx(className, Styles.main)} {...props}>
      <h2>WhiskeyList</h2>
      <div className={cx(Styles.list)}>
        {whiskyList?.map((w: GetDistillery_getDistillery_children) => (
          <WhiskeyListCard key={w.id} whisky={w} />
        ))}
      </div>
    </div>
  );
};
