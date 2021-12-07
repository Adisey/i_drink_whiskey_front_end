import React from "react";

import styles from "./Test.module.scss";

export const Test = (): JSX.Element => {
  return (
    <div className={styles.aaa}>
      text
      <div className={styles.bbb}>Style bbb</div>
      <div className={styles.ccc}>Style ccc</div>
    </div>
  );
};
