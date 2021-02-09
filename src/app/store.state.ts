import {Injectable} from '@angular/core';
import {State, Action, StateContext, Selector} from '@ngxs/store';
import {isLogin} from "./store.actions";

export interface UserStateModel {
  isAuth: boolean;
  name: string
  contacts: any[]
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    name: null,
    isAuth: false,
    contacts: []
  }
})
@Injectable()
export class StoreState {
  @Selector()
  static isLogin(state: UserStateModel) {
    return state;
  }

  @Action(isLogin)
  isLogin(ctx: StateContext<UserStateModel>, action: isLogin) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      isAuth: true,
      name: action.name
    });
  }
}
