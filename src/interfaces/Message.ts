import { Timestamp } from "firebase/firestore";

export interface Message{
  senderId: string;
  body: string;
  date: Timestamp;
}