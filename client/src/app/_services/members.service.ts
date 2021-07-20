import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Member, Photo } from '../_models/member';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.token}`
  })
}

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  readonly baseUrl = environment.apiUrl;

  constructor(private _http: HttpClient) { }

  getMembers() {
    return this._http.get<Member[]>(`${this.baseUrl}/users`, httpOptions);
  }

  getMember(username: string) {
    return this._http.get<Member>(`${this.baseUrl}/users/${username}`, httpOptions);
  }
}
