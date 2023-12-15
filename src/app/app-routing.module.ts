import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home/home-page/home-page.component';
import { AnnouncementsPageComponent } from './announcements/announcements-page/announcements-page.component';
import { GuidesPageComponent } from './guides/guides-page/guides-page.component';
import { CharbonsPageComponent } from './charbons/charbons-page/charbons-page.component';
import { ExercisesPageComponent } from './exercises/exercises-page/exercises-page.component';
import { ExerciseDetailsPageComponent } from './exercises/exercise-details-page/exercise-details-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: 'accueil', component: HomePageComponent },
  { path: 'annonces', component: AnnouncementsPageComponent },
  { path: 'guides', component: GuidesPageComponent },
  { path: 'charbons', component: CharbonsPageComponent },
  { path: 'exercices', component: ExercisesPageComponent },
  { path: 'exercices/:id', component: ExerciseDetailsPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
