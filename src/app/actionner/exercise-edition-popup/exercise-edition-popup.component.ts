import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Exercise } from 'src/app/shared/models/exercise.model';

@Component({
  selector: 'app-exercise-edition-popup',
  templateUrl: './exercise-edition-popup.component.html',
  styleUrls: ['./exercise-edition-popup.component.scss']
})
export class ExerciseEditionPopupComponent implements OnInit {
  editedExercise!: Exercise;

  constructor(private bsModalRef: BsModalRef) {}

  ngOnInit(): void {
    if (this.bsModalRef.content) {
      this.editedExercise = this.bsModalRef.content.editedExercise;
    }
  }

  close(): void {
    this.bsModalRef.hide();
  }
}
