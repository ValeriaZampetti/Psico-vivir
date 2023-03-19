import { Timestamp } from "firebase/firestore";
import { Message } from "postcss";

export interface Appointment {
  id?: string;
  title: string;
  description: string;
  date: Timestamp;
  duration: number;
  paid: boolean;
  messages: Message[];
}