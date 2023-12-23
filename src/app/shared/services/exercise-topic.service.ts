import { Injectable } from '@angular/core';
import {
  CourseType,
  getCourseType,
} from 'src/app/shared/utils/course-type.model';
import { ExerciseTopic } from 'src/app/shared/models/exercise-topic.model';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ExerciseTopicService {
  exerciseTopicList!: ExerciseTopic[];

  constructor(private http: HttpClient) {}

  getExerciseTopicList(): Observable<ExerciseTopic[]> {
    return this.http
      .get<any>('http://localhost/PLSres/api/exercise_topics')
      .pipe(
        map((data: any) =>
          data.map(
            (el: any) =>
              new ExerciseTopic(
                Number(el.id),
                String(el.topic),
                String(el.course),
                getCourseType(el.course_type),
                Number(el.exercise_count)
              )
          )
        )
      );
  }
}
