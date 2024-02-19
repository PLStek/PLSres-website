import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Exercise } from 'src/app/shared/models/exercise.model';
import { ExerciseService } from 'src/app/shared/services/exercise.service';
import { BackgroundCardComponent } from '../../shared/components/background-card/background-card.component';
import { MainButtonComponent } from '../../shared/components/main-button/main-button.component';
import { Title } from '@angular/platform-browser';
import { takeWhile } from 'rxjs';
import { BsModalService } from 'ngx-bootstrap/modal';
import { LoginPopupComponent } from 'src/app/shared/components/login-popup/login-popup.component';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-exercise-details-page',
  templateUrl: './exercise-details-page.component.html',
  styleUrls: ['./exercise-details-page.component.scss'],
  standalone: true,
  imports: [MainButtonComponent, RouterLink, BackgroundCardComponent],
})
export class ExerciseDetailsPageComponent implements OnInit {
  exercise?: Exercise = undefined;
  exerciseContent?: string = undefined;

  constructor(
    private route: ActivatedRoute,
    private exerciseService: ExerciseService,
    private modalService: BsModalService,
    private authService: AuthService,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      let id: number = parseInt(params['id'], 10);
      this.authService
        .isLogged()
        .pipe(takeWhile(() => !this.exercise))
        .subscribe((isLogged) => {
          isLogged ? this.getExercise(id) : this.openLoginPopup();
        });
    });
  }

  getExercise(id: number) {
    this.exerciseService.getExercise(id).subscribe({
      next: (data) => {
        this.exercise = data;
        this.updateTitle();
      },
    });
  }

  updateTitle() {
    this.title.setTitle(
      this.exercise?.title + ' - PLSres' ?? 'Exercices - PLSres'
    );
  }

  openLoginPopup() {
    this.modalService.show(LoginPopupComponent, {
      class: 'modal-lg',
    });
  }
}
