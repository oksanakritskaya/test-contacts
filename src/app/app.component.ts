import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {StoreState} from "./store.state";
import {Select, Store} from "@ngxs/store";
import {UserData} from "./interfaces";
import {deleteUser, setUser} from "./store.actions";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  @Select(StoreState) setUser$: Observable<UserData>;

  user: UserData;

  constructor(private store: Store,
              private router: Router) {}

  ngOnInit() {
    this.setUser$.subscribe((user: UserData) => {
      this.user = user;
    });
  }

  logOut = () => {
    this.store.dispatch(new deleteUser())
      .subscribe(() => this.router.navigateByUrl('', {replaceUrl: true}));
  }
}
