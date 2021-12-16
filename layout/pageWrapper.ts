import { getDataFromTree } from "@apollo/client/react/ssr";
import withApollo from "./withApollo";
import { withLayout } from "./Layout";
import { FunctionComponent } from "react";

export const pageWrapper = <T extends Record<string, unknown>>(
  Component: FunctionComponent<T>
) => withApollo(withLayout(Component), { getDataFromTree });
