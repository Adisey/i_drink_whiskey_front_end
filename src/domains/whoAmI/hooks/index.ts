import { useEffect, useState } from "react";
import * as Apollo from "@apollo/client";
import WhoAmI from "domains/whoAmI/graphql/whoAmI.graphql";
import { IWhoAmIResponse } from "domains/whoAmI/types";
import { Whoami, Whoami_whoami } from "../graphql";

export function useWhoAmI(): IWhoAmIResponse {
  const options = {};
  return Apollo.useQuery(WhoAmI, options);
}

type IUser = Partial<Whoami_whoami>;

type IUseWhoAmIMemo = IUser & {
  isLoading: boolean;
};

export function useWhoAmIMemo(): IUseWhoAmIMemo {
  const [user, setUser] = useState<IUser>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { loading, data } = Apollo.useQuery<Whoami>(WhoAmI);

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

  return { isLoading: isLoading, ...user };
}
export function useWhoAmIMemo2(): IUseWhoAmIMemo {
  const [user, setUser] = useState<IUser>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { loading, data } = Apollo.useQuery<Whoami>(WhoAmI);

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

  return { isLoading: isLoading, ...user };
}
