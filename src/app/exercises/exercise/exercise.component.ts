import { CourseType } from 'src/app/shared/utils/course-type.model';
import { AuthService } from './../../shared/services/auth.service';
import { Exercise } from 'src/app/shared/models/exercise.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ExerciseTopic } from 'src/app/shared/models/exercise-topic.model';
import { ExerciseService } from 'src/app/shared/services/exercise.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ExerciseEditionPopupComponent } from 'src/app/actionner/exercise-edition-popup/exercise-edition-popup.component';
import { ExerciseTopicEditionPopupComponent } from 'src/app/actionner/exercise-topic-edition-popup/exercise-topic-edition-popup.component';
import { ColorButtonComponent } from '../../shared/components/color-button/color-button.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RatingModule } from 'ngx-bootstrap/rating';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { take } from 'rxjs';
import { LoginPopupService } from 'src/app/shared/services/login-popup.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss'],
  standalone: true,
  imports: [
    NgClass,
    RouterLink,
    RatingModule,
    ReactiveFormsModule,
    FormsModule,
    ColorButtonComponent,
  ],
})
export class ExerciseComponent implements OnInit {
  @Input() exerciseTopic!: ExerciseTopic;
  @Input() editable: boolean = false;
  @Input() maxRating: number = 5;
  exerciseList!: Exercise[];

  @Output() popupClosed: EventEmitter<void> = new EventEmitter<void>();

  CourseType = CourseType;

  constructor(
    private exerciseService: ExerciseService,
    private modalService: BsModalService,
    private authService: AuthService,
    private loginPopupService: LoginPopupService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.exerciseList;
    this.editable;
    this.maxRating;
  }

  ngOnInit(): void {
    this.fetchExercises();
  }

  resetExerciseList(): void {
    this.exerciseList = [];
    this.fetchExercises();
  }

  fetchExercises(): void {
    this.exerciseService.getExercises(this.exerciseTopic.id).subscribe({
      next: (data: Exercise[]) => {
        this.exerciseList = data.filter((e) => e.difficulty <= this.maxRating);
      },
      error: () => {
        this.toastr.error(
          'Erreur lors de la récupération des exercices',
          'Erreur'
        );
      },
    });
  }

  openEditPopup(exercise: Exercise): void {
    const modalRef = this.modalService.show(ExerciseEditionPopupComponent, {
      class: 'modal-lg modal-dialog-centered',
      initialState: { editedExercise: exercise },
    });

    modalRef.onHidden?.subscribe(() => {
      this.resetExerciseList();
    });
  }

  openTopicEditPopup(): void {
    const modalRef = this.modalService.show(
      ExerciseTopicEditionPopupComponent,
      {
        class: 'modal-lg modal-dialog-centered',
        initialState: { editedExerciseTopic: this.exerciseTopic },
      }
    );

    modalRef.onHidden?.subscribe(() => {
      this.popupClosed.emit();
    });
  }

  openExercise(exercise: Exercise): void {
    this.authService
      .isLogged()
      .pipe(take(1))
      .subscribe((isLogged) => {
        if (exercise.copyright && !isLogged) {
          this.loginPopupService.open();
        } else {
          this.router.navigate(['/exercices', exercise.id]);
        }
      });
  }

  openDiscordLink() {
    window.open('https://discord.com', '_blank');
  }
}
