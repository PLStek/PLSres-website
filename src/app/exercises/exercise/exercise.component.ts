import { Exercise } from 'src/app/shared/models/exercise.model';
import { Component, Input, OnInit } from '@angular/core';
import { ExerciseTopic } from 'src/app/shared/models/exercise-topic.model';
import { ExerciseService } from 'src/app/shared/services/exercise.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ExerciseEditionPopupComponent } from 'src/app/actionner/exercise-edition-popup/exercise-edition-popup.component';
import { ExerciseTopicEditionPopupComponent } from 'src/app/actionner/exercise-topic-edition-popup/exercise-topic-edition-popup.component';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss'],
})
export class ExerciseComponent implements OnInit {
  @Input() exerciseTopic!: ExerciseTopic;
  @Input() editable: boolean = false;
  @Input() maxRating: number = 5;
  exerciseList!: Exercise[];

  constructor(
    private exerciseService: ExerciseService,
    private modalService: BsModalService
  ) {
    this.exerciseList;
    this.editable;
    this.maxRating;
  }

  ngOnInit(): void {
    this.exerciseService
      .getExercises({ topicId: this.exerciseTopic.id })
      .subscribe((data: Exercise[]) => {
        this.exerciseList = data.filter((e) => e.difficulty <= this.maxRating);
      });
  }

  openEditPopup(exercise: Exercise): void {
    this.modalService.show(ExerciseEditionPopupComponent, {
      class: 'modal-lg modal-dialog-centered',
      initialState: { editedExercise: exercise },
    });
  }

  openTopicEditPopup(): void {
    this.modalService.show(ExerciseTopicEditionPopupComponent, {
      class: 'modal-lg modal-dialog-centered',
      initialState: { editedExerciseTopic: this.exerciseTopic },
    });
  }

  openDiscordLink() {
    window.open('https://discord.com', '_blank');
  }
}
