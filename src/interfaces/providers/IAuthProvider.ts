import { UserCredential } from "firebase/auth";
import { Client, ClientCreate, Doctor, DoctorCreate } from "../Client";

export interface IAuthProvider {
  user: Client | Doctor  | null;
  loading: boolean
  logIn: (email: string, password: string) => Promise<UserCredential | null>;
  logInWithGoogle: (client?: Client) => Promise<UserCredential | null>;
  logInWithGithub: (client?: Client) => Promise<UserCredential | null>;
  register: (client: ClientCreate | DoctorCreate, password: string) => Promise<UserCredential | null>;
  logOut: () => Promise<void>;
}