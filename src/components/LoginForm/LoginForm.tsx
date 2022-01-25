//Core
import React, { useState } from "react";
import Router from "next/router";
import { useForm } from "react-hook-form";
import cx from "classnames";
//Other
import { IDivMainProps } from "../../interfaces/HTML.elements/div.main.props";
import { loginGQL } from "../../hooks/QraphQL/login";
import { LoginAPIVariables } from "../../hooks/QraphQL/login/__generated__/LoginAPI";
import { Input, Button, FieldMessage } from "../";
import { useAuthApolloProvider } from "../../apolloClient/AuthContext";
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
  const { saveToken } = useAuthApolloProvider();

  const badLogin = () => {
    setError("Bad Login.");
  };

  const onSubmit = async (formData: LoginAPIVariables) => {
    try {
      const data = await loginGQL(formData);
      const { access_token } = data.login;
      if (access_token) {
        if (await saveToken({ access: access_token })) {
          Router.push("/");
        } else {
          badLogin();
        }
      } else {
        badLogin();
      }
    } catch (e) {
      console.log(+new Date(), "-(ERROR)->", typeof e, `-e->`, e);
      reset();
      badLogin();
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
              type={"password"}
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
