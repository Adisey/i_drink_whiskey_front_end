import React from "react";
import Document, {
  Html,
  Head,
  NextScript,
  Main,
  DocumentContext,
  DocumentInitialProps,
} from "next/document";
import { Favicon } from "components/Favicon/Favicon";

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <title>I drink whisky (_d)</title>
          <meta property="og:title" content="My page title (_d)" key="title" />
          <Favicon />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
