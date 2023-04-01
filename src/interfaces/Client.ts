import { Timestamp } from "firebase/firestore";

export enum UserType {
  CLIENT = 1,
  DOCTOR = 2,
  ADMIN = 3,
}

/**
 * Interface used when creating a new user with Google or Github
 * and the other fields are yet unknown
 */
export interface UserNotAuthCreate {
  email: string;
  name: string;
  completed: boolean;
}

export interface UserNotAuth extends UserNotAuthCreate {
  id: string;
}

/**
 * Interface used when creating a new client and id is yet unknown
 */
export interface ClientCreate extends UserNotAuthCreate {
  type: UserType;
  phone: string;
  img: string;
}

export interface Client extends ClientCreate {
  id: string;
  createdAt: Timestamp;
}

/**
 * Interface used when creating a new Doctor and id is yet unknown
 */
export interface DoctorCreate extends ClientCreate {
  specialties: string[];
  ranking: number;
  numberOfReviews: number;
  biography: string;
  img: string;
}

export interface Doctor extends DoctorCreate {
  id: string;
  createdAt: Timestamp;
}
