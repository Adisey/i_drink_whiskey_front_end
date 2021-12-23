//Core
import React from "react";
import cx from "classnames";
//Interfaces
import { IDivMainProps } from "../../interfaces/HTML.elements/div.main.props";
import { IDistilleryItem } from "../../interfaces/discellery";
//Components
import { DistilleryListCard } from "./DistilleryListCard";
//Styles
import Styles from "./DistilleryList.module.scss";

interface IWhiskeyList extends IDivMainProps {
  distilleries: IDistilleryItem[];
}

export const DistilleryList: React.FC<IWhiskeyList> = ({
  className,
  distilleries,
  ...props
}: IWhiskeyList) => {
  return (
    <div className={cx(className, Styles.main)} {...props}>
      <h2>DistilleryList</h2>
      <div className={cx(Styles.list)}>
        {distilleries.map((w: IDistilleryItem) => (
          <DistilleryListCard key={w.id} distillery={w} />
        ))}
      </div>
    </div>
  );
};
