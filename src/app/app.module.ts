import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CharbonCardComponent } from './charbons/charbon-card/charbon-card.component';
import { MainButtonComponent } from './shared/main-button/main-button.component';
import { ColorButtonComponent } from './shared/color-button/color-button.component';
import { BackgroundCardComponent } from './shared/background-card/background-card.component';
import { SocialNetworksComponent } from './shared/social-networks/social-networks.component';
import { AnnouncementCardComponent } from './announcements/announcement-card/announcement-card.component';
import { CalendarComponent } from './charbons/calendar/calendar.component';
import { ExerciseComponent } from './exercises/exercise/exercise.component';

import { DateIntervalPipe } from './pipes/date-interval.pipe';

import { CharbonService } from './services/charbon.service';

import { FullCalendarModule } from '@fullcalendar/angular';
import { DatePipe } from '@angular/common';
import { HomePageComponent } from './home/home-page/home-page.component';
import { AnnouncementsPageComponent } from './announcements/announcements-page/announcements-page.component';
import { GuidesPageComponent } from './guides/guides-page/guides-page.component';
import { CharbonsPageComponent } from './charbons/charbons-page/charbons-page.component';
import { ExercisesPageComponent } from './exercises/exercises-page/exercises-page.component';
import { ExerciseDetailsPageComponent } from './exercises/exercise-details-page/exercise-details-page.component';

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
    ExerciseComponent,
    HomePageComponent,
    AnnouncementsPageComponent,
    GuidesPageComponent,
    CharbonsPageComponent,
    ExercisesPageComponent,
    ExerciseDetailsPageComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FullCalendarModule],
  providers: [CharbonService, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
