import { Component, OnInit } from '@angular/core';
import { Charbon } from 'src/app/shared/models/charbon.model';
import { CharbonService } from 'src/app/shared/services/charbon.service';
import { CharbonListComponent } from '../charbon-list/charbon-list.component';
import { CharbonCardComponent } from '../charbon-card/charbon-card.component';

import { CalendarComponent } from '../calendar/calendar.component';
import { BackgroundCardComponent } from '../../shared/components/background-card/background-card.component';
import { RouterLink } from '@angular/router';
import { MainButtonComponent } from '../../shared/components/main-button/main-button.component';
import { CharbonSortOption } from 'src/app/shared/models/charbon-get-parameters.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-charbons-page',
  templateUrl: './charbons-page.component.html',
  styleUrls: ['./charbons-page.component.scss'],
  standalone: true,
  imports: [
    MainButtonComponent,
    RouterLink,
    BackgroundCardComponent,
    CalendarComponent,
    CharbonCardComponent,
    CharbonListComponent,
  ],
})
export class CharbonsPageComponent implements OnInit {
  nextThreeCharbons: Charbon[] = [];
  selectedCharbon: Charbon | null = null;
  actionneur: boolean = false;

  constructor(
    private charbonService: CharbonService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.fetchThreeUpcomingCharbons();

    this.authService.isActionneur().subscribe((res) => (this.actionneur = res));
  }

  fetchThreeUpcomingCharbons(): void {
    this.charbonService.getCharbons().subscribe({
      next: (charbons) => {
        this.nextThreeCharbons = charbons
          .sort((a, b) => a.date.getTime() - b.date.getTime())
          .slice(-3);
      },
      error: () => {
        this.toastr.error(
          'Erreur lors de la récupération des charbons',
          'Erreur'
        );
      },
    });
  }

  handleSelectedCharbonChange(selectedCharbon: Charbon | null): void {
    this.selectedCharbon = selectedCharbon;
  }
}
