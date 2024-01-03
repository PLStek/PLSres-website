import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ExerciseTopic } from 'src/app/shared/models/exercise-topic.model';

@Component({
  selector: 'app-exercise-topic-edition-popup',
  templateUrl: './exercise-topic-edition-popup.component.html',
  styleUrls: ['./exercise-topic-edition-popup.component.scss']
})
export class ExerciseTopicEditionPopupComponent implements OnInit {
  editedExerciseTopic!: ExerciseTopic;

  constructor(private bsModalRef: BsModalRef) {}

  ngOnInit(): void {
    if (this.bsModalRef.content) {
      this.editedExerciseTopic = this.bsModalRef.content.editedExercise;
    }
  }

  close(): void {
    this.bsModalRef.hide();
  }

}
