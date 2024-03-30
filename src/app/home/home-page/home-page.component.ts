import { AnnouncementSortOption } from './../../shared/models/announcement-get-parameters.model';
import { AnnouncementService } from 'src/app/shared/services/announcement.service';
import { Component, OnInit } from '@angular/core';
import { Charbon } from 'src/app/shared/models/charbon.model';
import { Exercise } from 'src/app/shared/models/exercise.model';
import { CharbonService } from 'src/app/shared/services/charbon.service';
import { AnnouncementGetParameters } from 'src/app/shared/models/announcement-get-parameters.model';
import { Announcement } from 'src/app/shared/models/announcement.model';
import {
  CharbonGetParameters,
  CharbonSortOption,
} from 'src/app/shared/models/charbon-get-parameters.model';
import { AnnouncementCardComponent } from '../../announcements/announcement-card/announcement-card.component';
import { CharbonCardComponent } from '../../charbons/charbon-card/charbon-card.component';

import { BackgroundCardComponent } from '../../shared/components/background-card/background-card.component';
import { MainButtonComponent } from '../../shared/components/main-button/main-button.component';
import { SocialNetworksComponent } from '../../shared/components/social-networks/social-networks.component';
import { LoginPopupService } from 'src/app/shared/services/login-popup.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  standalone: true,
  imports: [
    SocialNetworksComponent,
    MainButtonComponent,
    BackgroundCardComponent,
    CharbonCardComponent,
    AnnouncementCardComponent,
  ],
})
export class HomePageComponent implements OnInit {
  title = 'PLSres';
  charbonList!: Charbon[];
  exerciseList!: Exercise[];
  lastAnnouncement!: Announcement;

  constructor(
    private charbonService: CharbonService,
    private announcementService: AnnouncementService,
    public loginPopupService: LoginPopupService,
    private toastr: ToastrService
  ) {
    this.charbonList = [];
  }

  ngOnInit(): void {
    const charbonParams: CharbonGetParameters = {
      minDate: new Date(),
      limit: 3,
      sort: CharbonSortOption.dateAsc,
    };
    this.charbonService.getCharbonList().subscribe({
      next: (charbons) => {
        this.charbonList = charbons;
      },
      error: (error) => {
        this.toastr.error(
          'Erreur lors de la récupération des charbons',
          'Erreur'
        );
      },
    });

    const announcementParams: AnnouncementGetParameters = {
      limit: 1,
      sort: AnnouncementSortOption.dateDesc,
    };
    this.announcementService.getAnnouncements(announcementParams).subscribe({
      next: (announcements) => {
        this.lastAnnouncement = announcements[0];
      },
      error: (error) => {
        this.toastr.error(
          'Erreur lors de la récupération des annonces',
          'Erreur'
        );
      },
    });
  }
}
