import { Component, OnInit } from '@angular/core';
import { Announcement } from 'src/app/shared/models/announcement.model';
import { AnnouncementService } from 'src/app/shared/services/announcement.service';

@Component({
  selector: 'app-announcements-page',
  templateUrl: './announcements-page.component.html',
  styleUrls: ['./announcements-page.component.scss'],
})
export class AnnouncementsPageComponent implements OnInit {
  announcementList: Announcement[] = [];

  constructor(private announcementService: AnnouncementService) {}

  ngOnInit(): void {
    this.announcementService.getAnnouncements().subscribe((announcements) => {
      this.announcementList = announcements;
      console.log(this.announcementList);
    });
  }
}
