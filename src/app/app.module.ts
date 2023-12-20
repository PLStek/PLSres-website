import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnnouncementCardComponent } from './announcements/announcement-card/announcement-card.component';
import { AnnouncementsPageComponent } from './announcements/announcements-page/announcements-page.component';
import { AppComponent } from './app.component';
import { CalendarComponent } from './charbons/calendar/calendar.component';
import { CharbonCardComponent } from './charbons/charbon-card/charbon-card.component';
import { CharbonsPageComponent } from './charbons/charbons-page/charbons-page.component';
import { ExerciseDetailsPageComponent } from './exercises/exercise-details-page/exercise-details-page.component';
import { ExerciseComponent } from './exercises/exercise/exercise.component';
import { ExercisesPageComponent } from './exercises/exercises-page/exercises-page.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { BackgroundCardComponent } from './shared/components/background-card/background-card.component';
import { ColorButtonComponent } from './shared/components/color-button/color-button.component';
import { MainButtonComponent } from './shared/components/main-button/main-button.component';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { SocialNetworksComponent } from './shared/components/social-networks/social-networks.component';
import { DateIntervalPipe } from './shared/pipes/date-interval.pipe';
import { ActionnerHomePageComponent } from './actionner/actionner-home-page/actionner-home-page.component';
import { AddCharbonComponent } from './actionner/add-charbon/add-charbon.component';
import { EditCharbonActionneurComponent } from './actionner/edit-charbon-actionneur/edit-charbon-actionneur.component';


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
    CharbonsPageComponent,
    ExercisesPageComponent,
    ExerciseDetailsPageComponent,
    ActionnerHomePageComponent,
    AddCharbonComponent,
    EditCharbonActionneurComponent,
  ],
  imports: [HttpClientModule, BrowserModule, AppRoutingModule, FullCalendarModule, ReactiveFormsModule, FormsModule ],
  providers: [HttpClientModule, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
