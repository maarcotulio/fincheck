import { createContext, useCallback, useEffect, useState } from "react";
import { localStorageKeys } from "../config/localStorageKeys";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { usersService } from "../services/usersService";
import { LaunchScreen } from "../../view/components/LaunchScreen";
import { User } from "../entities/User";

interface AuthContextValue {
  signedIn: boolean;
  signin(accessToken: string): void;
  signout(): void;
  user: User | undefined;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAccessToken = localStorage.getItem(
      localStorageKeys.ACCESS_TOKEN
    );

    return !!storedAccessToken;
  });

  const queryClient = useQueryClient();

  const { isError, isFetching, isSuccess, data } = useQuery({
    queryKey: ["user", "me"],
    queryFn: () => usersService.me(),
    enabled: signedIn,
    staleTime: Infinity,
  });

  const signin = useCallback((accessToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);

    setSignedIn(true);
  }, []);

  const signout = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
    queryClient.removeQueries({ queryKey: ["user", "me"] });

    setSignedIn(false);
  }, [queryClient]);

  useEffect(() => {
    if (isError) {
      signout();
    }
  }, [isError, signout]);

  return (
    <AuthContext.Provider
      value={{ signedIn: isSuccess && signedIn, signin, signout, user: data }}
    >
      <LaunchScreen isLoading={isFetching} />
      {!isFetching && children}
    </AuthContext.Provider>
  );
}
