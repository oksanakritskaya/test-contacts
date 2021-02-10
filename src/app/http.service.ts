import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {map, retry} from 'rxjs/operators';
import {Contact, User, UserData} from "./interfaces";

@Injectable()
export class HttpService {
  options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: 'body' | 'events' | 'response',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
    withCredentials?: boolean,
  }

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

  getContactsAll(id: number): Observable<Contact[]> {
    const opts = {params: new HttpParams({fromString: `user_id=${id.toString()}`})};

    return this.http.get('/contacts')
      .pipe(
        map((contacts: Contact[]) => {
          let result = contacts.filter((contact: Contact) => {
            return contact.id_user == id;
          });
          debugger;
          return result;
        })
      );
  }

  addContact(contact: Contact): Observable<Contact> {
    const opts = {params: new HttpParams({fromString: `user_id=${'1'}`})};

    return this.http.post('/contacts', contact)
      .pipe(
        map((contact: Contact) => contact)
      );
  }
}
