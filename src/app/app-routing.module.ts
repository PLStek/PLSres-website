import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home/home-page/home-page.component';
import { AnnouncementsPageComponent } from './announcements/announcements-page/announcements-page.component';
import { CharbonsPageComponent } from './charbons/charbons-page/charbons-page.component';
import { ExercisesPageComponent } from './exercises/exercises-page/exercises-page.component';
import { ExerciseDetailsPageComponent } from './exercises/exercise-details-page/exercise-details-page.component';
import { ActionnerHomePageComponent } from './actionner/actionner-home-page/actionner-home-page.component';
import { EditCharbonActionneurComponent } from './actionner/edit-charbon-actionneur/edit-charbon-actionneur.component';
import { FormConnectionComponent } from './shared/components/form-connection/form-connection.component';

const routes: Routes = [
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: 'accueil', component: HomePageComponent },
  { path: 'annonces', component: AnnouncementsPageComponent },
  { path: 'charbons', component: CharbonsPageComponent },
  { path: 'exercices', component: ExercisesPageComponent },
  { path: 'exercices/:id', component: ExerciseDetailsPageComponent },
  { path: 'action/accueil', component: ActionnerHomePageComponent },
  { path: 'action/edit-charbon', component: EditCharbonActionneurComponent },
  { path: 'connexion', component: FormConnectionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
