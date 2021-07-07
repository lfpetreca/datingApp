import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {  
  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor(private _accountService: AccountService, private _toastr: ToastrService) { }

  ngOnInit(): void {    
  }

  register() {
    console.log(this.model);
    this._accountService.register(this.model).subscribe(res => {
      console.log(res);
      this.cancel();
    }, error => {
      this._toastr.error(error.error);
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
