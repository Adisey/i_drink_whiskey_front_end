import React from "react";
import { IWhiskyItem } from "../../api/whiskies";

interface IWhiskeyListCard {
  whisky: IWhiskyItem;
}

export const WhiskeyListCard: React.FC<IWhiskeyListCard> = ({
  whisky,
}: IWhiskeyListCard) => {
  return (
    <div>
      {whisky.name} {whisky.age} {whisky.id}
    </div>
  );
};
