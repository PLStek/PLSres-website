import { Exercise } from 'src/models/exercise.model';
import { ExerciseService } from './../exercise.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exercises-page',
  templateUrl: './exercises-page.component.html',
  styleUrls: ['./exercises-page.component.scss'],
})
export class ExercisesPageComponent implements OnInit {
  exerciseList!: Exercise[];

  constructor(private exerciseService: ExerciseService) {}

  ngOnInit(): void {
    this.exerciseList = this.exerciseService.getExerciseList();
  }
}
