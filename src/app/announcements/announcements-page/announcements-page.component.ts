import { Component, OnInit } from '@angular/core';
import {
  AnnouncementGetParameters,
  AnnouncementSortOption,
} from 'src/app/shared/models/announcement-get-parameters.model';
import { Announcement } from 'src/app/shared/models/announcement.model';
import { AnnouncementService } from 'src/app/shared/services/announcement.service';
import { AnnouncementCardComponent } from '../announcement-card/announcement-card.component';

import { BackgroundCardComponent } from '../../shared/components/background-card/background-card.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MainButtonComponent } from '../../shared/components/main-button/main-button.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-announcements-page',
  templateUrl: './announcements-page.component.html',
  styleUrls: ['./announcements-page.component.scss'],
  standalone: true,
  imports: [
    MainButtonComponent,
    RouterLink,
    ReactiveFormsModule,
    FormsModule,
    BackgroundCardComponent,
    AnnouncementCardComponent,
  ],
})
export class AnnouncementsPageComponent implements OnInit {
  announcementList: Announcement[] = [];

  sortOption = AnnouncementSortOption.dateDesc;

  announcementSortOption = AnnouncementSortOption;

  constructor(
    private announcementService: AnnouncementService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.fetchAnnouncements();
  }

  fetchAnnouncements(): void {
    const params: AnnouncementGetParameters = {
      limit: 100,
      sort: this.sortOption,
    };
    this.announcementService.getAnnouncements(params).subscribe({
      next: (announcements) => {
        this.announcementList = announcements;
      },
      error: () => {
        this.toastr.error(
          'Erreur lors de la récupération des annonces',
          'Erreur'
        );
      },
    });
  }

  onSortChange(): void {
    this.announcementList = [];
    this.fetchAnnouncements();
  }
}
