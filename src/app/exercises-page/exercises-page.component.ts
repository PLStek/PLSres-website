import { Exercise } from 'src/models/exercise.model';
import { ExerciseService } from './../exercise.service';
import { Component, OnInit } from '@angular/core';
import { CourseType } from 'src/models/course-type.model';

@Component({
  selector: 'app-exercises-page',
  templateUrl: './exercises-page.component.html',
  styleUrls: ['./exercises-page.component.scss'],
})
export class ExercisesPageComponent implements OnInit {
  exerciseList!: Exercise[];

  //TODO: remove when exercisetopic modeel is implemented
  defailtCourseType: CourseType = CourseType.maths;

  constructor(private exerciseService: ExerciseService) {}

  ngOnInit(): void {
    this.exerciseList = this.exerciseService.getExerciseList();
  }
}
