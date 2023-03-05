import React, { createContext, useEffect, useState } from "react";
import { Client } from "../interfaces/Client";
import { IAuthProvider } from "../interfaces/providers/IAuthProvider";

interface IProps {
  children: React.ReactNode | React.ReactNode[];
}

export const AuthContext = createContext<IAuthProvider>({
  user: null,
  setUser: () => {},
});

function AuthProvider({ children }: IProps) {
  const [user, setUser] = useState<Client | null>(null);
  const value: IAuthProvider = {
    user: user,
    setUser: setUser,
  };

  useEffect(() => {}, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
