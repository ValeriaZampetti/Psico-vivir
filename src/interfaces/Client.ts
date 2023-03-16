import { Timestamp } from "firebase/firestore"

export interface Client{
  id?: string
  email: string
  name: string
  type: number,
  createdAt: Timestamp
}

export interface Doctor extends Client{
  specialties: string[]
  telephone: string
  ranking: number
  biography: string
}