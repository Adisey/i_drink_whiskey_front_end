import { withLayout } from "./Layout";
import { FunctionComponent } from "react";

export const pageWrapper = <T extends Record<string, unknown>>(
  Component: FunctionComponent<T>
) => withLayout(Component);
