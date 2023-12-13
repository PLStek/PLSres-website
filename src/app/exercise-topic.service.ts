import { Injectable } from '@angular/core';
import { CourseType } from 'src/models/course-type.model';
import { ExerciseTopic } from 'src/models/exercise-topic.model';

@Injectable({
  providedIn: 'root',
})
export class ExerciseTopicService {
  exerciseList!: ExerciseTopic[];

  constructor() {}

  getExerciseList(): ExerciseTopic[] {
    this.exerciseList = [];
    this.exerciseList.push(
      new ExerciseTopic(1, `Arbres binaires`, 'LO21', CourseType.info)
    );
    this.exerciseList.push(
      new ExerciseTopic(2, `Listes chaînées`, 'LO21', CourseType.info)
    );
    this.exerciseList.push(
      new ExerciseTopic(3, `Graphes`, 'LO21', CourseType.info)
    );
    return this.exerciseList;
  }
}
