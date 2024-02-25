import { Component, OnInit } from '@angular/core';
import { ExerciseListComponent } from '../exercise-list/exercise-list.component';
import { BackgroundCardComponent } from '../../shared/components/background-card/background-card.component';
import { RouterLink } from '@angular/router';
import { MainButtonComponent } from '../../shared/components/main-button/main-button.component';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-exercises-page',
  templateUrl: './exercises-page.component.html',
  styleUrls: ['./exercises-page.component.scss'],
  standalone: true,
  imports: [
    MainButtonComponent,
    RouterLink,
    BackgroundCardComponent,
    ExerciseListComponent,
  ],
})
export class ExercisesPageComponent implements OnInit {
  actionneur: boolean = false;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isActionneur().subscribe((res) => (this.actionneur = res));
  }
}
