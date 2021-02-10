import {Injectable} from '@angular/core';
import {State, Action, StateContext, Selector} from '@ngxs/store';
import {setUser, deleteUser} from "./store.actions";
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
    ctx.patchState(action.user);
  }

  @Action(deleteUser)
  deleteUser(ctx: StateContext<UserData>) {
    ctx.setState(null);
  }
}
