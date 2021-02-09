import {UserData} from "./interfaces";


export class setUser {
  static readonly type = '[Auth] setUser';
  constructor(public user: UserData) { }
}

export class isLogout {
  static readonly type = '[Auth] isLogout';
  constructor(public payload: any) { }
}
