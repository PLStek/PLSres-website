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
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      let id: number = parseInt(params['id'], 10);
      this.exerciseService
        .getExercises({ id: id, content: true })
        .subscribe((data) => {
          this.exercise = data[0] ?? undefined;
        });
    });
  }
}
