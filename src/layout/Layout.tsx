import React, { FC, ReactNode } from "react";
import { Header } from "./Header/Header";
import { Sidebar } from "./Sidebar/Sidebar";
import { Footer } from "./Footer/Footer";
import Styles from "./Layout.module.scss";

export interface ILayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: ILayoutProps): JSX.Element => {
  return (
    <div className={Styles.wrapper}>
      <Header className={Styles.header} />
      <Sidebar className={Styles.sidebar} />
      <div className={Styles.body}>{children}</div>
      <Footer className={Styles.footer} />
    </div>
  );
};

export const withLayout = <T extends Record<string, unknown>>(
  Component: FC<T>
) => {
  return function withLayoutComponent(props: T): JSX.Element {
    return (
      <Layout>
        <Component {...props} />
      </Layout>
    );
  };
};
