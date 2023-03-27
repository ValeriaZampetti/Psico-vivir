import { Timestamp } from "firebase/firestore";

export enum UserType { CLIENT = 1, DOCTOR = 2, ADMIN = 3}

/**
 * Interface used when creating a new client and id is yet unknown
 */
export interface ClientCreate {
  email: string;
  name: string;
  type: UserType;
  phone: number;
  countryCode: number;
  
  
}

export interface Client extends ClientCreate {
  id: string;
  createdAt: Timestamp;
  img: string;
}



/**
 * Interface used when creating a new Doctor and id is yet unknown
 */
export interface DoctorCreate extends ClientCreate {
  specialties: string[];
  ranking: number;
  numberOfReviews: number;
  biography: string;
  
}

export interface Doctor extends DoctorCreate {
  id: string;
  createdAt: Timestamp;
  img: string;
}
