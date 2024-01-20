import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ExerciseTopic } from 'src/app/shared/models/exercise-topic.model';
import { ExerciseTopicService } from 'src/app/shared/services/exercise-topic.service';

@Component({
  selector: 'app-exercise-topic-edition-popup',
  templateUrl: './exercise-topic-edition-popup.component.html',
  styleUrls: ['./exercise-topic-edition-popup.component.scss'],
})
export class ExerciseTopicEditionPopupComponent implements OnInit {
  editedExerciseTopic!: ExerciseTopic;

  constructor(
    private bsModalRef: BsModalRef,
    private exerciseTopicService: ExerciseTopicService
  ) {}

  ngOnInit(): void {
    if (this.bsModalRef.content) {
      this.editedExerciseTopic = this.bsModalRef.content.editedExercise;
    }
  }

  close(): void {
    this.bsModalRef.hide();
  }

  delete(): void {
    if (
      window.confirm(
        "Êtes-vous sûr de vouloir supprimer cette catégorie? L'intégralité des exercices qui lui sont associés seront supprimés."
      )
    ) {
      this.exerciseTopicService
        .deleteExerciseTopic(this.editedExerciseTopic.id)
        .subscribe(() => {
          this.close();
        });
    }
  }
}
