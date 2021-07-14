import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(
    public accontService: AccountService,
    private _router: Router,
    private _toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this._toastr.success('sucesso');
  }

  login() {
    this.accontService.login(this.model).subscribe(res => {
      this._router.navigateByUrl('/members');
    });
  }

  logout() {
    this.accontService.logout();
    this._router.navigateByUrl('/');
  }

}
