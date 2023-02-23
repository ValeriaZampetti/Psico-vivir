export interface Client{
  id?: string
  email: string
  name: string
  type: number
}

export interface Doctor extends Client{
  specialties: string[]
  telephone: string
  ranking: number
  biography: string
}