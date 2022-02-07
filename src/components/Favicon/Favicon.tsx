import React from "react";
import { Head } from "next/document";

export const Favicon: React.FC = () => {
  return (
    <Head>
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="../../public/favicon-32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="../../public/favicon-16.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="../../public/favicon-180.png"
      />
      <link
        rel="mask-icon"
        href="../../public/favicon-256.svg"
        color="#5bbad5"
      />
    </Head>
  );
};
