import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CharbonCardComponent } from './charbon-card/charbon-card.component';
import { MainButtonComponent } from './main-button/main-button.component';
import { ColorButtonComponent } from './color-button/color-button.component';
import { BackgroundCardComponent } from './background-card/background-card.component';
import { SocialNetworksComponent } from './social-networks/social-networks.component';
import { AnnouncementCardComponent } from './announcement-card/announcement-card.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ExerciseComponent } from './exercise/exercise.component';

import { DateIntervalPipe } from './date-interval.pipe';

import { CharbonService } from './charbon.service';

import { FullCalendarModule } from '@fullcalendar/angular';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    CharbonCardComponent,
    MainButtonComponent,
    ColorButtonComponent,
    BackgroundCardComponent,
    SocialNetworksComponent,
    AnnouncementCardComponent,
    DateIntervalPipe,
    CalendarComponent,
    ExerciseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule
  ],
  providers: [
    CharbonService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
