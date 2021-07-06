import { Component, OnInit } from '@angular/core';

import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  model: any = {};  

  constructor(public accontService: AccountService) { }

  ngOnInit(): void {    
  }

  login() {
    this.accontService.login(this.model).subscribe(res => {
      console.log(res);
    }, error => {
      console.log(error.error, error);
    });
  }

  logout() {
    this.accontService.logout();
  }

}
