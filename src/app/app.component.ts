import {Component, OnInit} from '@angular/core';
import {HttpService} from "./http.service";
import {Observable} from "rxjs";
import {StoreState, UserStateModel} from "./store.state";
import {Select, Store} from "@ngxs/store";
import {isLogin} from "./store.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @Select(StoreState) isLogin$: Observable<UserStateModel>;

  userName: string;

  constructor(private store: Store) {}

  ngOnInit() {
    this.isLogin$.subscribe((user: UserStateModel) => {
      this.userName = user.name;
    })
  }

  logOut = () => {
   /* this.store.dispatch(new isLogin(this.formGroup.value.login))
      .subscribe(() => this.router.navigate(['']));*/
  }
}
