//Core
import React from "react";
import type { AppProps } from "next/app";
//Other
import { AuthApolloProvider } from "../apolloClient/AuthContext";
//Styles
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <AuthApolloProvider>
        <Component {...pageProps} />
      </AuthApolloProvider>
    </>
  );
}

export default MyApp;
