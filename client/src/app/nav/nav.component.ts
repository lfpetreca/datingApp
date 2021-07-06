import { Component, OnInit } from '@angular/core';

import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  model: any = {};
  loggedIn = false;

  constructor(private _accontService: AccountService) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  login() {
    this._accontService.login(this.model).subscribe(res => {
      console.log(res);      
      this.loggedIn = true;
    }, error => {
      console.log(error.error, error);
    });
  }

  logout() {
    this._accontService.logout();
    this.loggedIn = false;
  }

  getCurrentUser() {
    this._accontService.currentUser$.subscribe(user => {
      this.loggedIn = !!user;
    }, error => {
      console.log(error);
    })
  }

}
