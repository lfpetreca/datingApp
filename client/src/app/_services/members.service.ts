import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Member } from '../_models/member';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  readonly baseUrl = environment.apiUrl;

  constructor(private _http: HttpClient) { }

  getMembers() {
    return this._http.get<Member[]>(`${this.baseUrl}/users`);
  }

  getMember(username: string) {
    return this._http.get<Member>(`${this.baseUrl}/users/${username}`);
  }
}
