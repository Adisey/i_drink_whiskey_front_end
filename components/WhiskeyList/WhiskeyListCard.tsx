import React from "react";
import { IWhiskyItem } from "../../api/whiskies";
import { getWhiskyPatch } from "../../domains/whisky";
import Link from "next/link";

interface IWhiskeyListCard {
  whisky: IWhiskyItem;
}

export const WhiskeyListCard: React.FC<IWhiskeyListCard> = ({
  whisky,
}: IWhiskeyListCard) => {
  return (
    <div>
      <Link href={getWhiskyPatch(whisky)}>
        <a>{whisky.name}</a>
      </Link>
      {whisky.age} {whisky.id}
    </div>
  );
};
