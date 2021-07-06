import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { User } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'The Dating App';
  users: any;

  constructor(private _http: HttpClient, private _accountService: AccountService) { }

  ngOnInit() {
    this.getUsers();
    this.setCurrentUser();
  }

  setCurrentUser() {
   const user: User = JSON.parse(localStorage.getItem('user'));
   this._accountService.setCurrentUser(user);
  }

  getUsers() {
    this._http.get('https://localhost:5001/api/users')
      .subscribe(res => {
        this.users = res;
      }, error => {
        console.log(error);
      })
  }
}
