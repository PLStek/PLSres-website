import { enableProdMode, importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { actionneurGuard } from './app/shared/guards/actionneur.guard';
import {
  provideRouter,
  Routes,
  withComponentInputBinding,
} from '@angular/router';
import { RatingModule } from 'ngx-bootstrap/rating';
import { ModalModule } from 'ngx-bootstrap/modal';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import {
  HttpClientModule,
  withInterceptorsFromDi,
  provideHttpClient,
} from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./app/home/home-page/home-page.component').then(
        (m) => m.HomePageComponent
      ),
    title: 'Accueil - PLSres',
  },
  {
    path: 'annonces',
    loadComponent: () =>
      import(
        './app/announcements/announcements-page/announcements-page.component'
      ).then((m) => m.AnnouncementsPageComponent),
    title: 'Annonces - PLSres',
  },
  {
    path: 'charbons',
    loadComponent: () =>
      import('./app/charbons/charbons-page/charbons-page.component').then(
        (m) => m.CharbonsPageComponent
      ),
    title: 'Charbons - PLSres',
  },
  {
    path: 'exercices',
    loadComponent: () =>
      import('./app/exercises/exercises-page/exercises-page.component').then(
        (m) => m.ExercisesPageComponent
      ),
    title: 'Exercices - PLSres',
  },
  {
    path: 'exercices/:id',
    loadComponent: () =>
      import(
        './app/exercises/exercise-details-page/exercise-details-page.component'
      ).then((m) => m.ExerciseDetailsPageComponent),
  },
  {
    path: 'actionner',
    loadComponent: () =>
      import(
        './app/actionner/actionner-home-page/actionner-home-page.component'
      ).then((m) => m.ActionnerHomePageComponent),
    canActivate: [actionneurGuard],
    title: 'Actionner - PLSres',
  },
  { path: '**', redirectTo: '/' },
];

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      FullCalendarModule,
      ReactiveFormsModule,
      FormsModule,
      ModalModule.forRoot(),
      RatingModule.forRoot()
    ),
    HttpClientModule,
    DatePipe,
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    provideToastr({
      preventDuplicates: true,
      progressBar: true,
      resetTimeoutOnDuplicate: true,
    }),
    provideRouter(routes, withComponentInputBinding()),
  ],
}).catch((err) => console.error(err));
