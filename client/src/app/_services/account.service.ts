import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

import { User } from '../_models/user';
import { environment } from '../../environments/environment';
import { PresenceService } from './presence.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  readonly baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private _http: HttpClient, private _presence: PresenceService) { }

  login(model: any) {
    return this._http.post<User>(`${this.baseUrl}/account/login`, model).pipe(
      map((user: User) => {
        if (user) {
          this.setCurrentUser(user);
          this._presence.createHubConnection(user);
        }
      })
    );
  }

  register(model: any) {
    return this._http.post<User>(`${this.baseUrl}/account/register`, model).pipe(
      map((user: User) => {
        if (user) {
          this.setCurrentUser(user);
          this._presence.createHubConnection(user);
        }
      })
    );
  }

  setCurrentUser(user: User) {
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    this._presence.stopHubConnection();
  }

  getDecodedToken(token) {
    return JSON.parse(atob(token.split('.')[1]));
  }
}
