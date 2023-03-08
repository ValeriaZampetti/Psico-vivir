export interface Appointment {
  id?: string;
  clientId: string;
  doctorId: string;
  description: string;
  date: Date;
  duration: number;
  completed: boolean;
}