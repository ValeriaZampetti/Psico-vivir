import { Timestamp } from "firebase/firestore";

export interface Appointment {
  id?: string;
  clientId: string;
  doctorId: string;
  description: string;
  date: Timestamp;
  duration: number;
  completed: boolean;
  paid: boolean;
}