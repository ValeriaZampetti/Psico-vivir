import { Appointment } from "./Appointment";

export interface Chat{
  id?: string;
  doctorId: string;
  clientId: string;
  /**
   * If the chat has an active appointment.
   * (If it has, it will alwayas be the last element of the array)
   */
  hasAppointmentActive: boolean;
  appointments: Appointment[];
}