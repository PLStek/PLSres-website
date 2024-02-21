import { AuthService } from './../../shared/services/auth.service';
import { loggedGuard } from './../../shared/guards/logged.guard';
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
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass } from '@angular/common';
import { LoginPopupComponent } from 'src/app/shared/components/login-popup/login-popup.component';
import { take } from 'rxjs';

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

  constructor(
    private exerciseService: ExerciseService,
    private modalService: BsModalService,
    private authService: AuthService,
    private router: Router
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
    this.exerciseService
      .getExercises({ topicId: this.exerciseTopic.id })
      .subscribe((data: Exercise[]) => {
        this.exerciseList = data.filter((e) => e.difficulty <= this.maxRating);
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
          this.openLoginPopup();
        } else {
          this.router.navigate(['/exercices', exercise.id]);
        }
      });
  }

  openLoginPopup() {
    this.modalService.show(LoginPopupComponent, {
      class: 'modal-lg',
    });
  }

  openDiscordLink() {
    window.open('https://discord.com', '_blank');
  }
}
