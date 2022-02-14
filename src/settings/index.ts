import { FetchPolicy } from "@apollo/client/core/watchQueryOptions";

type ISettings = {
  backendHost: string;
  pageStaticPropsCacheFetchPolicy: FetchPolicy;
  pageStaticPropsRevalidateSecond: number;
};

export const settings: ISettings = {
  backendHost: process?.env?.NEXT_PUBLIC_BACKEND || "localhost:4000",
  pageStaticPropsRevalidateSecond: 10, // sec - time to revalidate page
  pageStaticPropsCacheFetchPolicy: "no-cache",
};

// ToDo: 11.02.2022 -  need think about "pageStaticPropsRevalidateSecond"
// ToDo: 11.02.2022 -  need think about "pageStaticPropsCacheFetchPolicy"
