import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Exercise } from 'src/models/exercise.model';
import { ExerciseService } from '../exercise.service';

@Component({
  selector: 'app-exercise-details-page',
  templateUrl: './exercise-details-page.component.html',
  styleUrls: ['./exercise-details-page.component.scss'],
})
export class ExerciseDetailsPageComponent implements OnInit {
  exercise?: Exercise = undefined;

  constructor(
    private route: ActivatedRoute,
    private exerciseService: ExerciseService
  ) {
    this.route.params.subscribe((params) => {
      let id = params['id'];
      this.exercise = this.exerciseService.getExerciseList().find((exercise) => {
        return exercise.id == id;
      });
    });
  }

  ngOnInit(): void {}
}
