import { Timestamp } from "firebase/firestore";

export interface MessageCreate {
  senderId: string;
  body: string;
}

export interface Message extends MessageCreate {
  date: Timestamp;
}
