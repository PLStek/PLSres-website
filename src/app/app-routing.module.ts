import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home/home-page/home-page.component';
import { AnnouncementsPageComponent } from './announcements/announcements-page/announcements-page.component';
import { CharbonsPageComponent } from './charbons/charbons-page/charbons-page.component';
import { ExercisesPageComponent } from './exercises/exercises-page/exercises-page.component';
import { ExerciseDetailsPageComponent } from './exercises/exercise-details-page/exercise-details-page.component';
import { ActionnerHomePageComponent } from './actionner/actionner-home-page/actionner-home-page.component';
import { EditCharbonActionneurComponent } from './actionner/edit-charbon-actionneur/edit-charbon-actionneur.component';
import { LoginPopupComponent } from './shared/components/login-popup/login-popup.component';
import { ActionneurGuard } from './shared/guards/actionneur.guard';
import { LoggedGuard } from './shared/guards/logged.guard';

const routes: Routes = [
  { path: 'accueil', component: HomePageComponent },
  { path: 'annonces', component: AnnouncementsPageComponent },
  { path: 'charbons', component: CharbonsPageComponent },
  { path: 'exercices', component: ExercisesPageComponent },
  {
    path: 'exercices/:id',
    component: ExerciseDetailsPageComponent,
    canActivate: [LoggedGuard],
  },
  { path: 'connexion', component: LoginPopupComponent },
  {
    path: 'actionner/accueil',
    component: ActionnerHomePageComponent,
    canActivate: [ActionneurGuard],
  },
  {
    path: 'actionner/charbons',
    component: EditCharbonActionneurComponent,
    canActivate: [ActionneurGuard],
  },
  { path: '**', redirectTo: '/accueil' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
