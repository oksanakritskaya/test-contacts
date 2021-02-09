import {Component, OnInit} from '@angular/core';
import {HttpService} from "./http.service";
import {Observable} from "rxjs";
import {StoreState} from "./store.state";
import {Select, Store} from "@ngxs/store";
import {setUser} from "./store.actions";
import {UserData} from "./interfaces";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  @Select(StoreState) setUser$: Observable<UserData>;

  user: UserData;

  constructor(private store: Store) {}

  ngOnInit() {
    this.setUser$.subscribe((user: UserData) => {
      this.user = user;
    });
  }

  logOut = () => {
   /* this.store.dispatch(new setUser(this.formGroup.value.login))
      .subscribe(() => this.router.navigate(['']));*/
  }
}
