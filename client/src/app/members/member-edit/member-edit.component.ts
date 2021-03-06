import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';

import { User } from '../../_models/user';
import { Member } from '../../_models/member';
import { AccountService } from '../../_services/account.service';
import { MembersService } from '../../_services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm
  user: User;
  member: Member;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if(this.editForm.dirty) {
      $event.returnValue = true;
    }
   }

  constructor(private _accountService: AccountService, private _memberService: MembersService, private _toastr: ToastrService) {
    this._accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    this._memberService.getMember(this.user.username).subscribe(member => this.member = member);
  }

  updateMember() {
    this._memberService.updateMember(this.member).subscribe(() => {
      this._toastr.success('Profile updated successfully');
      this.editForm.reset(this.member);
    });    
  }
}
