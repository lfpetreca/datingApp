import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { NgxGalleryImage } from '@kolkov/ngx-gallery';
import { NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';

import { Message } from '../../_models/message';
import { Member } from '../../_models/member';
import { MessageService } from '../../_services/message.service';
import { PresenceService } from '../../_services/presence.service';
import { User } from '../../_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit, OnDestroy {
  member: Member;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  @ViewChild('memberTabs', { static: true }) memberTabs: TabsetComponent;
  activeTab: TabDirective;
  messages: Message[] = [];
  user: User;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _messageService: MessageService,
    public presence: PresenceService,
    private accountService: AccountService
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this._route.data.subscribe(data => this.member = data.member);

    this._route.queryParams.subscribe(params => params.tab ? this.selectTab(params.tab) : this.selectTab(0))

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];

    this.galleryImages = this.getImages();
  }

  getImages(): NgxGalleryImage[] {
    const imageUrl = [];
    for (const photo of this.member?.photos) {
      imageUrl.push({ small: photo.url, medium: photo.url, big: photo.url })
    }
    return imageUrl;
  }

  selectTab(tabId: number) {
    this.memberTabs.tabs[tabId].active = true;
  }

  loadMessages() {
    this._messageService.getMessagesThread(this.member.username).subscribe(messages => this.messages = messages);
  }

  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    if (this.activeTab.heading === 'Messages' && this.messages.length === 0) {
      this._messageService.createHubConnection(this.user, this.member.username);
    } else {
      this._messageService.stopHubConnection();
    }
  }

  ngOnDestroy() {
    this._messageService.stopHubConnection();
  }
}
