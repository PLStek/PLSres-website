import { Component, OnInit } from '@angular/core';
import { Charbon } from 'src/app/shared/models/charbon.model';
import { CharbonService } from 'src/app/shared/services/charbon.service';
import { CharbonListComponent } from '../charbon-list/charbon-list.component';
import { CharbonCardComponent } from '../charbon-card/charbon-card.component';

import { CalendarComponent } from '../calendar/calendar.component';
import { BackgroundCardComponent } from '../../shared/components/background-card/background-card.component';
import { RouterLink } from '@angular/router';
import { MainButtonComponent } from '../../shared/components/main-button/main-button.component';

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
    CharbonListComponent
],
})
export class CharbonsPageComponent implements OnInit {
  nextThreeCharbons: Charbon[] = [];
  selectedCharbon: Charbon | null = null;

  constructor(private charbonService: CharbonService) {}

  ngOnInit(): void {
    this.fetchThreeUpcomingCharbons();
  }

  fetchThreeUpcomingCharbons(): void {
    this.charbonService
      .getCharbonList({ minDate: new Date(), limit: 3, sort: 'dateAsc' })
      .subscribe((charbons) => {
        this.nextThreeCharbons = charbons;
      });
  }  

  handleSelectedCharbonChange(selectedCharbon: Charbon | null): void {
    this.selectedCharbon = selectedCharbon;
  }
}
