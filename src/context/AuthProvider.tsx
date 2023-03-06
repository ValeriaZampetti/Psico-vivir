import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { getUserById } from "../firebase/api";
import { auth } from "../firebase/config";
import { Client } from "../interfaces/Client";
import { IAuthProvider } from "../interfaces/providers/IAuthProvider";

interface IProps {
  children: React.ReactNode | React.ReactNode[];
}

export const AuthContext = createContext<IAuthProvider>({
  user: null,
  loading: true,
  login: () => new Promise(() => {}),
});

function AuthProvider({ children }: IProps) {
  const [user, setUser] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubuscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log({ currentUser });
      setUser(await getUserById(currentUser?.uid || ""));
      console.log(user);
      setLoading(false);
    });

    console.log(loading);
    return () => unsubuscribe();
  }, []);

  async function login(
    email: string,
    password: string
  ): Promise<UserCredential> {
    console.log("login", email, password);
    return signInWithEmailAndPassword(auth, email, password);
  }

  const value: IAuthProvider = {
    user,
    loading,
    login,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
