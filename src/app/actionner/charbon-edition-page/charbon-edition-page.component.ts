import { Component, OnInit } from '@angular/core';
import { Charbon } from 'src/app/shared/models/charbon.model';
import { CharbonListComponent } from '../../charbons/charbon-list/charbon-list.component';
import { AddCharbonComponent } from '../charbon-form/charbon-form.component';
import { CharbonCardComponent } from '../../charbons/charbon-card/charbon-card.component';
import { NgIf } from '@angular/common';
import { CalendarComponent } from '../../charbons/calendar/calendar.component';
import { BackgroundCardComponent } from '../../shared/components/background-card/background-card.component';
import { RouterLink } from '@angular/router';
import { MainButtonComponent } from '../../shared/components/main-button/main-button.component';

@Component({
    selector: 'app-edit-charbon-actionneur',
    templateUrl: './charbon-edition-page.component.html',
    styleUrls: ['./charbon-edition-page.component.scss'],
    standalone: true,
    imports: [
        MainButtonComponent,
        RouterLink,
        BackgroundCardComponent,
        CalendarComponent,
        NgIf,
        CharbonCardComponent,
        AddCharbonComponent,
        CharbonListComponent,
    ],
})
export class CharbonEditionPageComponent implements OnInit {
  selectedCharbon: Charbon | null = null;

  constructor() {}

  ngOnInit(): void {
  }

  handleSelectedCharbonChange(selectedCharbon: Charbon | null): void {
    this.selectedCharbon = selectedCharbon;
  }
}
