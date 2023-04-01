import { Timestamp } from "@firebase/firestore";
import { Appointment } from "./Appointment";

export interface ChatCreate {
  doctorId: string;
  clientId: string;
  /**
   * If the chat has an active appointment.
   * (If it has, it will alwayas be the last element of the array)
   */
  lastAppointmentActive: boolean;
  lastAppointmentReviewed: boolean;
  appointments: Appointment[];
}

export interface Chat extends ChatCreate {
  id: string;
  updatedAt: Timestamp;
}
