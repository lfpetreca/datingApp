import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {  
  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor(private _accountService: AccountService) { }

  ngOnInit(): void {    
  }

  register() {
    console.log(this.model);
    this._accountService.register(this.model).subscribe(res => {
      console.log(res);
      this.cancel();
    }, error => {
      console.log(error);
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
