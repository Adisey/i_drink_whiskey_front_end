import React from "react";
import { IWhiskyItem } from "../../api/whiskies";
import { WhiskeyListCard } from "./WhiskeyListCard";

interface IWhiskeyList {
  whiskyList: IWhiskyItem[];
}

export const WhiskeyList: React.FC<IWhiskeyList> = ({
  whiskyList,
}: IWhiskeyList) => {
  console.log(
    +new Date(),
    "-(WhiskeyList)->",
    whiskyList.length,
    `-whiskeys->`,
    whiskyList
  );
  return (
    <div>
      WhiskeyList
      {whiskyList.map((w: IWhiskyItem) => (
        <WhiskeyListCard key={w.id} whisky={w} />
      ))}
    </div>
  );
};
