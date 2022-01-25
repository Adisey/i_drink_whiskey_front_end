//Core
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
//Settings
import { settings } from "settings";

const localStorageKeys = {
  access: "access",
};

type IDataToken = {
  email?: string;
  exp?: number;
};

type ITokens = {
  access?: string;
};

type IAuthApolloContextType = {
  tokens?: ITokens;
  user?: string;
  cleanToken(): Promise<void>;
  getToken(): Promise<boolean>;
  saveToken(tokens: ITokens): Promise<boolean>;
  apolloClient: ApolloClient<NormalizedCacheObject>;
};

const authApolloContextDefaultValues: IAuthApolloContextType = {
  tokens: {},
  user: "",
  cleanToken: async (): Promise<void> => await Promise.resolve(),
  getToken: async (): Promise<boolean> => true,
  saveToken: async (): Promise<boolean> => true,
  apolloClient: new ApolloClient({ cache: new InMemoryCache() }),
};

const AuthApolloContext = createContext<IAuthApolloContextType>(
  authApolloContextDefaultValues
);

export function useAuthApolloProvider() {
  return useContext(AuthApolloContext);
}

type Props = {
  children: ReactNode;
};

export function AuthApolloProvider({ children }: Props) {
  const [tokens, setTokens] = useState<ITokens>({});
  const [user, setUser] = useState<string>();

  const cleanToken = async (): Promise<void> => {
    setTokens({});
    setUser(undefined);
    await localStorage.removeItem(localStorageKeys.access);
  };

  const getDataToken = (token: string): IDataToken => {
    return JSON.parse(atob(token.split(".")[1]));
  };

  const isValidToken = (token: string): boolean => {
    try {
      const { email, exp } = getDataToken(token);
      return !!email && !!exp && +new Date(exp * 1000) > +new Date();
    } catch {
      return false;
    }
  };

  const getToken = async (): Promise<boolean> => {
    const access = await localStorage.getItem(localStorageKeys.access);
    if (!access) {
      return false;
    } else if (isValidToken(access)) {
      await setTokens({ access });
      return true;
    } else {
      await cleanToken();
      return true;
    }
  };

  const saveToken = async (tokens: ITokens): Promise<boolean> => {
    if (tokens.access && isValidToken(tokens.access)) {
      setTokens(tokens);
      await localStorage.setItem(localStorageKeys.access, tokens.access);
      return true;
    } else {
      await cleanToken();
      return false;
    }
  };

  useEffect(() => {
    if (tokens.access && isValidToken(tokens.access)) {
      const { email } = getDataToken(tokens.access);
      setUser(email);
    }
  }, [tokens.access]);

  const checkValidToken = () => {
    if (tokens?.access) {
      if (!isValidToken(tokens.access)) {
        cleanToken();
      }
    }
  };

  useEffect(() => {
    const idInterval = setInterval(() => {
      checkValidToken();
    }, 1000 * 60);
    return () => clearInterval(idInterval);
  }, []);

  const getAuthHeaders = () => {
    if (user && tokens?.access) {
      return {
        authorization: `Bearer ${tokens.access}`,
      };
    } else return null;
  };

  const createApolloClient = () => {
    const link = new HttpLink({
      uri: `http://${settings.backendHost}/graphql`,
      headers: getAuthHeaders(),
    });

    return new ApolloClient({
      cache: new InMemoryCache(),
      link,
    });
  };

  const apolloClient: ApolloClient<NormalizedCacheObject> =
    createApolloClient();

  useEffect(() => {
    getToken();
  }, []);

  const value: IAuthApolloContextType = {
    tokens,
    user,
    cleanToken,
    apolloClient: apolloClient,
    getToken,
    saveToken,
  };

  return (
    <AuthApolloContext.Provider value={value}>
      <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
    </AuthApolloContext.Provider>
  );
}
