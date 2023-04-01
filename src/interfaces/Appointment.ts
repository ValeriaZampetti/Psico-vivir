import { Timestamp } from "firebase/firestore";
import { Message } from "./Message";

export interface Appointment {
  title: string;
  description: string;
  date: Timestamp;
  duration: number;
  paid: boolean;
  clientCanTalk: boolean;
  messages: Message[];
  paymentData?: any;
  
}