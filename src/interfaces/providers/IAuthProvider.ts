import { UserCredential } from "firebase/auth";
import { Client, ClientCreate, Doctor, DoctorCreate } from "../Client";

export interface IAuthProvider {
  user: Client | Doctor  | null;
  loading: boolean
  logIn: (email: string, password: string) => Promise<UserCredential | null>;
  logInWithGoogle: () => Promise<UserCredential | null>;
  logInWithGithub: () => Promise<UserCredential | null>;
  register: (client: ClientCreate | DoctorCreate, password: string) => Promise<UserCredential | null>;
  logOut: () => Promise<void>;
  completeRegister: (client: ClientCreate | DoctorCreate, userId: string) => Promise<boolean>;
  
  updateUser: (user: ClientCreate | DoctorCreate | Client | Doctor,
  userId: string) => Promise<boolean> 
}
