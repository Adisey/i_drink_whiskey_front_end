import * as Apollo from "@apollo/client";
import WhoAmI from "hooks/QraphQL/whoAmI/whoAmI.graphql";
import { IWhoAmIResponse } from "./types";
import { useEffect, useState } from "react";
import {
  whoami,
  whoami_whoami,
} from "hooks/QraphQL/whoAmI/__generated__/whoami";

export function useWhoAmI(): IWhoAmIResponse {
  const options = {};
  return Apollo.useQuery(WhoAmI, options);
}

type IUser = Partial<whoami_whoami>;

type IUseWhoAmIMemo = IUser & {
  isLoading: boolean;
};

export function useWhoAmIMemo(): IUseWhoAmIMemo {
  const [user, setUser] = useState<IUser>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { loading, data } = Apollo.useQuery<whoami>(WhoAmI);

  useEffect(() => {
    if (!loading) {
      const loadingUser = data?.whoami;
      if (JSON.stringify(user) !== JSON.stringify(loadingUser)) {
        setUser({ ...loadingUser });
      }
    }
    if (isLoading !== loading) {
      setIsLoading(loading);
    }
  }, [loading, data]);
  console.log(+new Date(), `--(RENDER)- useWhoAmIMemo ->`, isLoading, user);
  return { isLoading: isLoading, ...user };
}
