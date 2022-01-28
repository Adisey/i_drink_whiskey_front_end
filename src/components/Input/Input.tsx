//Core
import React, {
  DetailedHTMLProps,
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
} from "react";
import cn from "classnames";
import { FieldError } from "react-hook-form";
//Style
import Styles from "components/Input/Input.module.scss";

export interface IInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  error?: FieldError;
  label?: string;
  labelPosition?: "top" | "left" | "none";
}

export const Input = forwardRef(
  (
    { className, error, label, labelPosition, ...props }: IInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ): JSX.Element => {
    return (
      <div
        className={cn(className, Styles.inputWrapper, {
          [Styles.top]: labelPosition === "top",
          [Styles.left]: labelPosition === "left",
        })}
      >
        <div
          className={cn(Styles.label, {
            [Styles.labelNone]: labelPosition === "none",
            [Styles.labelLeft]: labelPosition === "left",
          })}
        >
          {label}
        </div>
        <div className={Styles.inputField}>
          <input
            className={cn(Styles.input, {
              [Styles.error]: error,
            })}
            ref={ref}
            {...props}
          />
          {error && (
            <span className={Styles.errorMessage}>{error.message}</span>
          )}
        </div>
      </div>
    );
  }
);
