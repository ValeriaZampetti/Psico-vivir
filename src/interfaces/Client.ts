export interface Client{
  id?: string
  email: string
  name: string
  type: number
  img: string
}

export interface Doctor extends Client{
  specialties: string[]
  telephone: string 
  ranking: number
  biography: string
}