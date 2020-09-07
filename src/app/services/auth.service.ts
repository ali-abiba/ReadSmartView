import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

import * as moment from 'moment';
import {tap} from 'rxjs/operators';

@Injectable()
export class AuthService {
  redirectUrl: string;
  currentUser: number;
  constructor(private http: HttpClient) {
  }

  /**
   * Method to verify login
   */
  public login(loginInfo) {
    const url = environment.apiUri + '/auth/login';
    const body = {
      email: loginInfo.email,
      password: loginInfo.password
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(url, body, httpOptions)
      .pipe(tap(res => this.setSession(res)));
  }

  /**
   * Adds user to system, expects JWT in response.
   */
  public addUser(userInfo) {
    const url = environment.apiUri + '/users/add-user';
    const body = {
      email: userInfo.email,
      password: userInfo.password
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(url, body, httpOptions)
      .pipe(tap(res => this.setSession(res)));
  }

  setSession(result) {
    const expires = moment().add(result.expiresIn, 'second');
    console.log(result);
    localStorage.setItem('userId', result.user);
    localStorage.setItem('token', result.token);
    localStorage.setItem('expires', JSON.stringify(expires.valueOf()));
  }

  logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('expires');
  }

  public isLoggedIn() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  public isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires');
    const expiresAt = JSON.parse(expiration);
    return moment().add(expiresAt);
  }

  getUserId(): string {
    return localStorage.getItem('userId');
  }
}
