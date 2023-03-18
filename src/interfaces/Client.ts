import { Timestamp } from "firebase/firestore";

/**
 * Interface used when creating a new client and id is yet unknown
 */
export interface ClientCreate {
  email: string;
  name: string;
  type: number;
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
  telephone: string;
  ranking: number;
  biography: string;
  
}

export interface Doctor extends DoctorCreate {
  id: string;
  createdAt: Timestamp;
  img: string;
}
