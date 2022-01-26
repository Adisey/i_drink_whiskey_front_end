import * as Apollo from "@apollo/client";
import WhoAmI from "hooks/QraphQL/whoAmI/whoAmI.graphql";
import { IWhoAmIResponse } from "./types";

export function useWhoAmI(): IWhoAmIResponse {
  const options = {};
  return Apollo.useQuery(WhoAmI, options);
}
