import { onAuthStateChanged, UserCredential } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import {
  signIn,
  signInWithGoogle,
  signInWithGithub,
  createUser,
  logOutAuth,
  updateUser,
} from "../firebase/api/authService";
import { getUserById } from "../firebase/api/userService";
import { auth } from "../firebase/config";
import { Client, ClientCreate, Doctor, DoctorCreate } from "../interfaces/Client";
import { IAuthProvider } from "../interfaces/providers/IAuthProvider";

interface IProps {
  children: React.ReactNode | React.ReactNode[];
}

export const AuthContext = createContext<IAuthProvider>({
  user: null,
  loading: true,
  logIn: (email: string, password: string) => {
    console.log("no estas usando la funcion que es");
    return new Promise(() => {});
  },
  register: (client: ClientCreate | DoctorCreate, password: string) => {
    console.log("no estas usando la funcion que es");
    return new Promise(() => {});
  },

  logInWithGoogle: () => {
    console.log("no estas usando la funcion que es");
    return new Promise(() => {});
  },

  logInWithGithub: () => {
    console.log("no estas usando la funcion que es");
    return new Promise(() => {});
  },

  logOut: () => {
    console.log("no estas usando la funcion que es");
    return new Promise(() => {});
  },

  completeRegister: (client: ClientCreate | DoctorCreate, userId: string) => {
    console.log("no estas usando la funcion que es");
    return new Promise(() => {});
  },
  updateUser: (client: ClientCreate | DoctorCreate, userId: string) => {
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
    try {
      return signIn(email, password);
    } catch (error) {
      throw error;
    }
  }

  async function logInWithGoogle() {
    return signInWithGoogle();
  }

  async function register(
    client: ClientCreate | DoctorCreate,
    password: string
  ): Promise<UserCredential | null> {
    return createUser(client, password);
  }

  async function logInWithGithub() {
    return signInWithGithub();
  }

  async function completeRegister(
    client: ClientCreate | DoctorCreate,
    userId: string
  ): Promise<boolean> {
    return updateUser(client, userId);
  }

  async function logOut() {
    logOutAuth();
    setUser(null);
  }

  async function updateCurrentUser(
    client: ClientCreate | DoctorCreate | Doctor | Client,
    userId: string
  ): Promise<boolean> {
    const result = await updateUser(client, userId);
    if (result) {
      setUser(client as Client | Doctor);
    }

    return result;
  }

  const value: IAuthProvider = {
    user,
    loading,
    logIn: login,
    logInWithGoogle,
    register,
    logInWithGithub,
    logOut,
    completeRegister,
    updateUser: updateCurrentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
