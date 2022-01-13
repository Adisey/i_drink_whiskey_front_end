import { useState } from "react";

const localStorageKeys = {
  access: "access",
};

type ITokens = {
  access?: string;
};
type IUseToken = {
  tokens: ITokens;
  saveToken(tokens: ITokens): Promise<void>;
  getToken(): Promise<boolean>;
  cleanToken(): Promise<void>;
};

export function useToken(): IUseToken {
  const [tokens, setTokens] = useState<ITokens>({});
  const saveToken = async (tokens: ITokens): Promise<void> => {
    setTokens(tokens);
    if (tokens.access) {
      await localStorage.setItem(localStorageKeys.access, tokens.access);
    }
  };

  const cleanToken = async (): Promise<void> => {
    setTokens({});
    await localStorage.removeItem(localStorageKeys.access);
  };

  const isValidToken = (tokens: string): boolean => {
    return true;
  };

  const getToken = async (): Promise<boolean> => {
    const access = await localStorage.getItem(localStorageKeys.access);
    if (!access) {
      return false;
    } else if (isValidToken(access)) {
      return false;
    } else {
      setTokens({ access });
      return true;
    }
  };

  return { tokens, saveToken, getToken, cleanToken };
}
