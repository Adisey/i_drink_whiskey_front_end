//Core
import React from "react";
import cx from "classnames";
//Other
import CloseIcon from "./close.svg";
//Styles
import Styles from "./FieldMessage.module.scss";

interface IFieldMessage {
  isError?: boolean;
  message?: string;
  setHide?: () => void;
}

export const FieldMessage: React.FC<IFieldMessage> = ({
  message,
  isError,
  setHide,
}: IFieldMessage) => {
  return (
    <div
      className={cx(Styles.main, {
        [Styles.hide]: !message,
        [Styles.error]: message && isError,
        [Styles.info]: message && !isError,
      })}
    >
      {message}
      {message ? (
        <CloseIcon className={Styles.closeIcon} onClick={setHide} />
      ) : null}
    </div>
  );
};
