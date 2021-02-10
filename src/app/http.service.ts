import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Contact, User, UserData} from "./interfaces";

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {
  }

  getUser(data: User): Observable<UserData> {
    return this.http.get('/users')
      .pipe(
        map((users: UserData[]) => {
          const user = users.find((user: UserData) => {
            return user.login == data.login && user.password == data.password;
          });

          if (!user) {
            throw new Error('User not found');
          }

          return user;
        })
      )
  }

  getContacts(id: number): Observable<Contact[]> {
    const opts = {params: new HttpParams({fromString: `user_id=${id.toString()}`})};

    return this.http.get('/contacts', opts)
      .pipe(
        map((contacts: Contact[]) => contacts)
      );
  }

  addContact(contact: Contact): Observable<Contact> {
    const opts = {params: new HttpParams({fromString: `user_id=${'1'}`})};

    return this.http.post('/contacts', contact)
      .pipe(
        map((contact: Contact) => contact)
      );
  }

  updateContact(id: number, contact: Contact): Observable<Contact> {
    return this.http.patch(`/contacts/${id.toString()}`, contact)
      .pipe(
        map((contact: Contact) => {
          debugger;
          return contact;
        })
      );
  }

  deleteContact(id: number): Observable<any> {
    return this.http.delete(`/contacts/${id.toString()}`);
  }
}
