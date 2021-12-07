import React from "react";

import styles from "./Test.module.scss";

export const Test = (): JSX.Element => {
  return (
    <div>
      <div className={styles.aaa}>TEST</div>
      <div className={styles.bbb}>TEST</div>
      <div className={styles.ccc}>TEST</div>
    </div>
  );
};
