import {Injectable} from '@angular/core';
import {State, Action, StateContext, Selector} from '@ngxs/store';
import {setUser} from "./store.actions";
import {UserData} from "./interfaces";

@State<UserData>({
  name: 'user',
  defaults: null
})
@Injectable()
export class StoreState {
  @Selector()
  static setUser(state: UserData) {
    return state;
  }

  @Action(setUser)
  setUser(ctx: StateContext<UserData>, action: setUser) {
    ctx.setState({
      ...action.user
    });
  }
}
