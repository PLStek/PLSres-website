import { Injectable } from '@angular/core';
import { CourseType } from 'src/models/course-type.model';
import { ExerciseTopic } from 'src/models/exercise-topic.model';

@Injectable({
  providedIn: 'root',
})
export class ExerciseTopicService {
  exerciseTopicList!: ExerciseTopic[];

  constructor() {}

  getExerciseTopicList(): ExerciseTopic[] {
    this.exerciseTopicList = [];
    this.exerciseTopicList.push(
      new ExerciseTopic(1, `Arbres binaires`, 'LO21', CourseType.info)
    );
    this.exerciseTopicList.push(
      new ExerciseTopic(2, `Listes chaînées`, 'LO21', CourseType.meca)
    );
    this.exerciseTopicList.push(
      new ExerciseTopic(3, `Graphes`, 'LO21', CourseType.maths)
    );
    return this.exerciseTopicList;
  }
}
