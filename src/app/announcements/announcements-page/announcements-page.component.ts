import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from 'src/app/shared/services/announcement.service';

@Component({
  selector: 'app-announcements-page',
  templateUrl: './announcements-page.component.html',
  styleUrls: ['./announcements-page.component.scss'],
})
export class AnnouncementsPageComponent implements OnInit {
  constructor(private announcementService: AnnouncementService) {}

  ngOnInit(): void {
    this.announcementService.getAnnouncements().subscribe((announcements) => {
      console.log(announcements);
    });
  }
}
