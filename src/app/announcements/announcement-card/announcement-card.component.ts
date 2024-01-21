import { Component, Input, OnInit } from '@angular/core';
import { Announcement } from 'src/app/shared/models/announcement.model';
import { NgClass, NgIf, DatePipe } from '@angular/common';

@Component({
    selector: 'app-announcement-card',
    templateUrl: './announcement-card.component.html',
    styleUrls: ['./announcement-card.component.scss'],
    standalone: true,
    imports: [
        NgClass,
        NgIf,
        DatePipe,
    ],
})
export class AnnouncementCardComponent implements OnInit {
  @Input() announcement?: Announcement;
  @Input() collapse?: boolean = false;

  constructor() {
    this.announcement;
    this.collapse;
  }

  ngOnInit(): void { }
}
