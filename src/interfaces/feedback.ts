import { Timestamp } from "firebase/firestore";

export interface FeedbackCreate {
  chatId: string;
  appointmentIndex: number;
  rating: number;
  message: string;
  userId: string;
  timestamp: Timestamp;
  doctorId: string;
}

export interface Feedback extends FeedbackCreate {
  id: string;
}