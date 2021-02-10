import {Component, OnInit} from '@angular/core';
import {HttpService} from "../http.service";
import {StoreState} from "../store.state";
import {Select} from "@ngxs/store";
import {Observable} from "rxjs";
import {Contact, UserData} from "../interfaces";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {get as getByPath} from "lodash";
import {catchError, tap} from "rxjs/operators";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html'
})
export class ContactsComponent implements OnInit {
  @Select(StoreState) setUser$: Observable<UserData>;

  userId: number;

  contacts: Contact[];

  formGroup: FormGroup = this.formBuilder.group({});

  newFormGroup: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    number: ['', Validators.required]
  })

  constructor(private http: HttpService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.setUser$.subscribe((user: UserData) => {
      this.userId = user.id;
    });

    this.getContacts();
  }

  getContacts = (): void => {
    this.http.getContacts(this.userId)
      .subscribe((contacts: Contact[]) => {
        this.contacts = contacts;

        /*
        formGroup
          controls
            formGroup id
              controls = name, number
        */

        this.contacts.forEach((contact: Contact) => {
          const contactFormGroup: FormGroup = this.formBuilder.group({
            name: [contact.name, Validators.required],
            number: [contact.number, Validators.required]
          });

          this.formGroup.addControl(contact.id.toString(), new FormControl(contactFormGroup, Validators.required));
        });
      });
  }

  add = () => {
    const newContact: Contact = {
      ...this.newFormGroup.value,
      user_id: this.userId
    };

    this.http.addContact(newContact)
      .pipe(
        tap(() => this.newFormGroup.reset()),
        tap(this.getContacts),
      )
      .subscribe();

    return false;
  }

  save = (id: number) => {
    this.http.updateContact(id, this.getContactFormGroup(id).value)
      .pipe(
        tap(this.getContacts)
      )
      .subscribe();

    return false;
  }

  delete = (id: number) => {
    this.http.deleteContact(id)
      .pipe(
        tap(this.getContacts)
      )
      .subscribe();
  }

  getContactFormGroup = (id: number) => {
    return getByPath(this.formGroup.controls[id.toString()], 'value');
  }
}
