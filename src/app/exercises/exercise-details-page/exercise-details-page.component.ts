import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Exercise } from 'src/app/shared/models/exercise.model';
import { ExerciseService } from 'src/app/shared/services/exercise.service';
import { BackgroundCardComponent } from '../../shared/components/background-card/background-card.component';
import { MainButtonComponent } from '../../shared/components/main-button/main-button.component';
import { Title } from '@angular/platform-browser';
import { take } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoginPopupService } from 'src/app/shared/services/login-popup.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-exercise-details-page',
  templateUrl: './exercise-details-page.component.html',
  styleUrls: ['./exercise-details-page.component.scss'],
  standalone: true,
  imports: [MainButtonComponent, RouterLink, BackgroundCardComponent],
})
export class ExerciseDetailsPageComponent implements OnInit {
  @Input() id!: number;
  exercise?: Exercise = undefined;
  content?: string;

  constructor(
    private router: Router,
    private exerciseService: ExerciseService,
    private authService: AuthService,
    private loginPopupService: LoginPopupService,
    private title: Title,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getExercise();
  }

  getExercise() {
    this.exerciseService.getExercise(this.id).subscribe({
      next: (ex) => {
        this.exercise = ex;
        this.updateTitle();
        this.getExerciseContent();
      },
      error: () => {
        this.toastr.error(
          "Erreur lors de la récupération de l'exercice",
          'Erreur'
        );
      },
    });
  }

  getExerciseContent() {
    this.exerciseService.getExerciseContent(this.id).subscribe({
      next: (content) => {
        this.content = content;
      },
      error: (error) => {
        if (error.status === 401) {
          this.openLoginPopup();
        } else {
          this.toastr.error(
            "Erreur lors de la récupération du contenu de l'exercice",
            'Erreur'
          );
        }
      },
    });
  }

  updateTitle() {
    this.title.setTitle(
      this.exercise?.title + ' - PLSres' ?? 'Exercices - PLSres'
    );
  }

  openLoginPopup() {
    this.loginPopupService.open(() => {
      this.authService
        .isLogged()
        .pipe(take(1)) // Change to takeWhile to handle deconnexion
        .subscribe((isLogged) =>
          isLogged
            ? this.getExerciseContent()
            : this.router.navigate(['/exercices'])
        );
    });
  }
}
