//Core
import React from "react";
import cx from "classnames";
//Interfaces
import { IWhiskyItem } from "../../api/whiskies";
import { IDivMainProps } from "../../interfaces/div.main.props";
//Components
import { WhiskeyListCard } from "./WhiskeyListCard";
//Styles
import Styles from "./WhiskeyList.module.scss";

interface IWhiskeyList extends IDivMainProps {
  whiskyList: IWhiskyItem[];
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
        {whiskyList.map((w: IWhiskyItem) => (
          <WhiskeyListCard key={w.id} whisky={w} />
        ))}
      </div>
    </div>
  );
};
