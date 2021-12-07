import React from "react";

import Styles from "./CardInfo.module.scss";

export const CardInfo = (): JSX.Element => {
  return (
    <div className={Styles.cardInfo}>
      <div className={Styles.title}>
        <div className={Styles.name}>Lagavulin</div>
        <div className={Styles.rating}>98</div>
      </div>
      <div className={Styles.fields}>
        <div className={Styles.field}>
          <div className={Styles.name}>Whiskybase ID</div>
          <div className={Styles.value}>WB112975</div>
        </div>
        <div className={Styles.field}>
          <div className={Styles.name}>Category</div>
          <div className={Styles.value}>Single Malt</div>
        </div>
        <div className={Styles.field}>
          <div className={Styles.name}>Distillery</div>
          <div className={Styles.value}>Lagavulin</div>
        </div>
        <div className={Styles.field}>
          <div className={Styles.name}>Bottler</div>
          <div className={Styles.value}>Distillery Bottling</div>
        </div>
      </div>
      <div className={Styles.pictures}>
        <div className={Styles.picture}>BIG PIC</div>
        <div className={Styles.preview}>
          <div className={Styles.preview}>Pic1</div>
          <div className={Styles.preview}>Pic2</div>
          <div className={Styles.preview}>Pic3</div>
          <div className={Styles.preview}>Pic4</div>
        </div>
      </div>
    </div>
  );
};
