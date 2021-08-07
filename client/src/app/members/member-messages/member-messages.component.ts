import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'src/app/_services/message.service';

import { Message } from '../../_models/message';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.scss']
})
export class MemberMessagesComponent implements OnInit {
  @Input() username: string;
  messages: Message[];

  constructor(private _messageService: MessageService) { }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
    this._messageService.getMessagesThread(this.username).subscribe(messages => this.messages = messages);
  }

}
