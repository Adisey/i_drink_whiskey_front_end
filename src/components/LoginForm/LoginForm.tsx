//Core
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import cx from "classnames";
//Other
import { IDivMainProps } from "interfaces/HTML.elements/div.main.props";
import { loginGQL } from "hooks/QraphQL/login";
import { LoginAPIVariables } from "hooks/QraphQL/login/__generated__/LoginAPI";
import { Input, Button, FieldMessage } from "../";
//Styles
import Styles from "./LoginForm.module.scss";

interface ILoginForm extends IDivMainProps {
  children?: never;
}

export const LoginForm: React.FC<ILoginForm> = ({ className, ...props }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginAPIVariables>();
  const [error, setError] = useState<string>();

  const onSubmit = async (formData: LoginAPIVariables) => {
    console.log(+new Date(), "-()->", typeof formData, `-formData->`, formData);
    try {
      const data = await loginGQL(formData);
      console.log(+new Date(), "-(FORM)->", typeof data, `-data->`, data);
    } catch (e) {
      console.log(+new Date(), "-(ERROR)->", typeof e, `-e->`, e);
      reset();
      setError("Bad Login.");
    }
  };

  return (
    <div className={cx(className, Styles.main)} {...props}>
      <div className={Styles.box}>
        <div className={Styles.title}>
          <h1>Login</h1>
        </div>
        <div className={Styles.form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              {...register("email", {
                required: { value: true, message: "Can't be empty" },
              })}
              placeholder="Login"
              error={errors.email}
              label={"Login"}
            />
            <Input
              {...register("password", {
                required: { value: true, message: "Can't be empty" },
              })}
              placeholder="Password"
              error={errors.password}
              label={"Password"}
            />
            <FieldMessage
              message={error}
              isError
              setHide={() => setError(undefined)}
            />
            <div className={Styles.toolbar}>
              <Button appearance={"primary"}>Login</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
