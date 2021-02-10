import {UserData} from "./interfaces";


export class setUser {
  static readonly type = '[Auth] setUser';
  constructor(public user: UserData) { }
}

export class deleteUser {
  static readonly type = '[Auth] deleteUser';
  constructor() { }
}
