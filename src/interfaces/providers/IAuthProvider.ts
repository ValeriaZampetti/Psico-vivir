import { UserCredential } from "firebase/auth";
import { Client, Doctor } from "../Client";

export interface IAuthProvider {
  user: Client | Doctor  | null;
  loading: boolean
  login: (email: string, password: string) => Promise<UserCredential | null>;
  loginWithGoogle: (client?: Client) => Promise<UserCredential | null>;
  loginWithGithub: (client?: Client) => Promise<UserCredential | null>;
  register: (client: Client, password: string) => Promise<UserCredential | null>;
}