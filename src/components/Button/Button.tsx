//Core
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
//Style
import styles from "components/Button/Button.module.scss";

import cn from "classnames";

export interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: ReactNode;
  appearance: "primary" | "ghost";
}

export const Button = ({
  appearance,
  children,
  className,
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <button
      className={cn(styles.button, className, {
        [styles.primary]: appearance == "primary",
        [styles.ghost]: appearance == "ghost",
      })}
      {...props}
    >
      {children}
    </button>
  );
};
