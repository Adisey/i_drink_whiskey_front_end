//Core
import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ReactNode,
} from "react";
//Style
import cx from "classnames";
import styles from "components/Button/Button.module.scss";

export interface IButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: ReactNode;
  appearance?: "primary" | "ghost";
}

export const Button = ({
  appearance = "ghost",
  children,
  className,
  ...props
}: IButtonProps): JSX.Element => {
  return (
    <button
      className={cx(styles.button, className, {
        [styles.primary]: appearance == "primary",
        [styles.ghost]: appearance == "ghost",
      })}
      {...props}
    >
      {children}
    </button>
  );
};
