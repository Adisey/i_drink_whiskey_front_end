import { withLayout } from "./Layout";
import { FC } from "react";

export const pageWrapper = <T extends Record<string, unknown>>(
  Component: FC<T>
) => withLayout(Component);
