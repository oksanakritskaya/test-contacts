export interface User {
  login: string
  password: any[]
}

export interface UserData extends User {
  id: number;
}

export interface Contact {
  id: number;
  id_user: number;
  name: string;
  number: number;
}
