import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { signIn, signInWithGoogle, signInWithGithub } from "../firebase/api/authService";
import { createUser, getUserById } from "../firebase/api/UserService";
import { auth } from "../firebase/config";
import { Client, ClientCreate, DoctorCreate } from "../interfaces/Client";
import { IAuthProvider } from "../interfaces/providers/IAuthProvider";

interface IProps {
  children: React.ReactNode | React.ReactNode[];
}

export const AuthContext = createContext<IAuthProvider>({
  user: null,
  loading: true,
  login: (email: string, password: string) => {
    console.log("no estas usando la funcion que es");
    return new Promise(() => {});
  },
  register: (client: ClientCreate | DoctorCreate, password: string) => {
    console.log("no estas usando la funcion que es");
    return new Promise(() => {});
  },

  loginWithGoogle: (client?: Client) => {
    console.log("no estas usando la funcion que es");
    return new Promise(() => {});
  },

  loginWithGithub: (client?: Client) => {
    console.log("no estas usando la funcion que es");
    return new Promise(() => {});
  },
});

function AuthProvider({ children }: IProps) {
  const [user, setUser] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubuscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        setLoading(true);
        if (!currentUser) {
          throw new Error("No hay usuario autenticado");
        }

        const user = await getUserById(currentUser?.uid || "");
        if (!user) {
          throw new Error("Usuario autenticado no existe en la base de datos");
        }

        setUser(user);
        setLoading(false);
        console.log("loading", loading);
      } catch (error) {
        setLoading(false);
        console.log(error);
        throw error;
      }
    });

    return () => unsubuscribe();
  }, []);

  async function login(
    email: string,
    password: string
  ): Promise<UserCredential | null> {
    console.log("login", email, password);
    return signIn(email, password);
  }

  async function loginWithGoogle() {
    return signInWithGoogle();
  }

  async function register(
    client: ClientCreate | DoctorCreate,
    password: string
  ): Promise<UserCredential | null> {
    return createUser(client, password);
  }

  async function loginWithGithub() {
    return signInWithGithub();
  }

  const value: IAuthProvider = {
    user,
    loading,
    login,
    loginWithGoogle,
    register,
    loginWithGithub,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
