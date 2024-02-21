import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Exercise } from 'src/app/shared/models/exercise.model';
import { ExerciseService } from 'src/app/shared/services/exercise.service';
import { BackgroundCardComponent } from '../../shared/components/background-card/background-card.component';
import { MainButtonComponent } from '../../shared/components/main-button/main-button.component';
import { Title } from '@angular/platform-browser';
import { take } from 'rxjs';
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
  @Input() id!: number;
  exercise?: Exercise = undefined;

  constructor(
    private router: Router,
    private exerciseService: ExerciseService,
    private modalService: BsModalService,
    private authService: AuthService,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.getExercise();
  }

  getExercise() {
    this.exerciseService.getExercise(this.id).subscribe({
      next: (ex) => {
        this.exercise = ex;
        this.updateTitle();
      },
      error: (error) => {
        if (error.status === 401) {
          this.openLoginPopup();
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
    const modalRef = this.modalService.show(LoginPopupComponent, {
      class: 'modal-lg',
    });

    modalRef.onHidden?.subscribe(() => {
      this.authService
        .isLogged()
        .pipe(take(1))
        .subscribe((isLogged) =>
          isLogged ? this.getExercise() : this.router.navigate(['/exercices'])
        );
    });
  }
}
