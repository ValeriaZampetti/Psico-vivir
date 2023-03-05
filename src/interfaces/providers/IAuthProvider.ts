import { Client } from "../Client";

export interface IAuthProvider {
  user: Client | null;
  setUser: (user: Client | null) => void;
}