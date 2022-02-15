import { FetchPolicy } from "@apollo/client/core/watchQueryOptions";
import { IListVariables } from "../domains";

type ISettings = {
  backendHost: string;
  pageStaticPropsCacheFetchPolicy: FetchPolicy;
  pageStaticPropsRevalidateSecond: number;
  defaultListValue: IListVariables;
};

export const settings: ISettings = {
  backendHost: process?.env?.NEXT_PUBLIC_BACKEND || "localhost:4000",
  pageStaticPropsRevalidateSecond: 10, // sec - time to revalidate page
  pageStaticPropsCacheFetchPolicy: "no-cache",
  defaultListValue: {
    pageSize: 10000,
    pageNumber: 1,
    find: "",
    sortBy: "name",
    sortOrder: 1,
  },
};

// ToDo: 11.02.2022 -  need think about "pageStaticPropsRevalidateSecond"
// ToDo: 11.02.2022 -  need think about "pageStaticPropsCacheFetchPolicy"
