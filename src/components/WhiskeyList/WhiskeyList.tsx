//Core
import React from "react";
import cx from "classnames";
//Interfaces
import { IDivMainProps } from "../../interfaces/HTML.elements/div.main.props";
import { IMainItem } from "../../interfaces/GraphQL.main";
//Components
import { WhiskeyListCard } from "./WhiskeyListCard";
//Styles
import Styles from "./WhiskeyList.module.scss";

interface IWhiskeyList extends IDivMainProps {
  whiskyList?: IMainItem[];
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
        {whiskyList?.map((w: IMainItem) => (
          <WhiskeyListCard key={w.id} whisky={w} />
        ))}
      </div>
    </div>
  );
};
