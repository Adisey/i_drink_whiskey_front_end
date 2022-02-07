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
    const title = "I drink whisky";
    return (
      <Html lang="en">
        <Head>
          <title>{title}</title>
          <meta property="og:title" content={title} key="title" />
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
