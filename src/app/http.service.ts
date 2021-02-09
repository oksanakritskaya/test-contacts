import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import {User, UserData} from "./interfaces";

@Injectable()
export class HttpService {
  options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe?: 'body' | 'events' | 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'arraybuffer'|'blob'|'json'|'text',
    withCredentials?: boolean,
  }

  constructor(private http: HttpClient) {}

  logIn(data: User): Observable<any> {
    return this.http.get('/users')
      .pipe(
        map((users: UserData[]) => {
          return users.some((user: User) => {
            return user.login == data.login && user.password == data.password;
          });
        })
    )
  }
}
