import React from "react";
import Styles from "./Loading.module.scss";

interface ILoading {
  isLoading: boolean;
  tip?: string;
  children?: never;
}

export const Loading: React.FC<ILoading> = ({
  isLoading,
  tip = "Loading...",
}) => {
  return isLoading ? (
    <section className={Styles.main}>
      <div className={Styles.containerCenter}>
        <div className={Styles.tip}>
          <div className={Styles.text}>{tip}</div>
          <div className={Styles.spinner}>:.</div>
        </div>
      </div>
    </section>
  ) : null;
};
