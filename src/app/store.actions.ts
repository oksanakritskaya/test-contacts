export class isLogin {
  static readonly type = '[Auth] isLogin';
  constructor(public name: string) { }
}

export class isLogout {
  static readonly type = '[Auth] isLogout';
  constructor(public payload: any) { }
}
