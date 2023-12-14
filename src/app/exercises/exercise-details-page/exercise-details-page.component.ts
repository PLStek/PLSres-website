import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Exercise } from 'src/app/shared/models/exercise.model';
import { ExerciseService } from 'src/app/shared/services/exercise.service';

@Component({
  selector: 'app-exercise-details-page',
  templateUrl: './exercise-details-page.component.html',
  styleUrls: ['./exercise-details-page.component.scss'],
})
export class ExerciseDetailsPageComponent implements OnInit {
  exercise?: Exercise = undefined;
  exerciseContent?: string = undefined;

  constructor(
    private route: ActivatedRoute,
    private exerciseService: ExerciseService
  ) {
    this.route.params.subscribe((params) => {
      let id = params['id'];
      this.exercise = this.exerciseService
        .getExerciseList()
        .find((exercise) => {
          return exercise.id == id;
        });
      if (this.exercise) {
        this.exerciseContent = this.exerciseService.getExerciseContent(
          this.exercise.id
        );
      }
    });
  }

  ngOnInit(): void {}
}
