export interface User {
  login: string,
  password: string
}

export interface UserData extends User{
  id: number,
  name: string,
  contacts: any[]
}
