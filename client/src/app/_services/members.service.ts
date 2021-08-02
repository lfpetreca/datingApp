import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Member } from '../_models/member';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  readonly baseUrl = environment.apiUrl;
  members: Member[] = [];

  constructor(private _http: HttpClient) { }

  getMembers() {
    if (this.members.length > 0) return of(this.members);
    return this._http.get<Member[]>(`${this.baseUrl}/users`).pipe(
      map(members => {
        this.members = members;
        return members;
      })
    );

  }

  getMember(username: string) {
    const member = this.members.find(x => x.username === username);
    if (member !== undefined) return of(member);
    return this._http.get<Member>(`${this.baseUrl}/users/${username}`);
  }

  updateMember(member: Member) {
    return this._http.put(`${this.baseUrl}/users/`, member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    );
  }
}
