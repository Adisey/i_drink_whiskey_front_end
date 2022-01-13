import { useEffect, useState } from "react";

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
type IUseToken = {
  tokens: ITokens;
  user?: string;
  cleanToken(): Promise<void>;
  getToken(): Promise<boolean>;
  saveToken(tokens: ITokens): Promise<boolean>;
};

export function useToken(): IUseToken {
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

  return { tokens, user, cleanToken, getToken, saveToken };
}
