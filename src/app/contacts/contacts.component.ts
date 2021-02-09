import { Component, OnInit } from '@angular/core';
import {HttpService} from "../http.service";
import {StoreState} from "../store.state";
import {Select} from "@ngxs/store";
import {Observable} from "rxjs";
import {Contact, UserData} from "../interfaces";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html'
})
export class ContactsComponent implements OnInit {
  @Select(StoreState) setUser$: Observable<UserData>;

  user: UserData;

  contacts: Contact[];

  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.setUser$.subscribe((user: UserData) => {
      this.user = user;
    });

    this.http.getContacts(this.user.id)
      .subscribe((contacts: Contact[]) => {
        this.contacts = contacts;
      });
  }

}
