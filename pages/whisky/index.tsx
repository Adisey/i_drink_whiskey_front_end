import React from "react";
import { useMenu, useWhiskyList } from "../../api";
import { pageWrapper } from "../../layout/pageWrapper";
import { WhiskeyList } from "../../components";

const WhiskyMain = (): JSX.Element => {
  const menu = useMenu();
  console.log(
    +new Date(),
    "-(WhiskyMain)-menu-1->",
    typeof menu,
    `-menu->`,
    menu
  );

  const menuList = menu?.data?.pagesListTree?.countries;
  console.log(
    +new Date(),
    "-(WhiskyMain)-menu-2->",
    menu.loading,
    menuList?.length,
    `-menuList->`,
    menuList
  );

  const { loading, data } = useWhiskyList();
  console.log(
    +new Date(),
    "-(WhiskyMain)-WhiskyList-1->",
    typeof loading,
    `-loading->`,
    loading
  );
  if (loading) {
    return <div>Loading..</div>;
  }
  console.log(
    +new Date(),
    "-(WhiskyMain)-WhiskyList-2->",
    typeof data,
    `-data->`,
    data
  );

  const whiskyList = data?.whiskyList?.list || [];

  console.log(
    +new Date(),
    "-(WhiskyList)-WhiskyList-3->",
    typeof whiskyList,
    whiskyList.length,
    `-whiskyList->`,
    whiskyList
  );
  return (
    <div>
      WhiskyMain
      <WhiskeyList whiskyList={whiskyList} />
    </div>
  );
};

export default pageWrapper(WhiskyMain);
