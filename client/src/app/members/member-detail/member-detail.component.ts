import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { NgxGalleryImage } from '@kolkov/ngx-gallery';
import { NgxGalleryAnimation } from '@kolkov/ngx-gallery';

import { Member } from '../../_models/member';
import { MembersService } from '../../_services/members.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit {
  member: Member;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private _membersService: MembersService, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadMember();

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ]
  }
  
  loadMember() {
    this._membersService.getMember(this._route.snapshot.paramMap.get('username'))
    .subscribe(member => {
      this.member = member;
      this.galleryImages = this.getImages();
    })
  }

  getImages(): NgxGalleryImage[] {
    const imageUrl = [];
    for (const photo of this.member?.photos) {
      imageUrl.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url
      })
    }

    return imageUrl;
  }

}
