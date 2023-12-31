import { Injectable } from '@angular/core';
import {
  CourseType,
  getCourseType,
} from 'src/app/shared/utils/course-type.model';
import { ExerciseTopic } from 'src/app/shared/models/exercise-topic.model';
import { Observable, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ExerciseTopicPostParameters } from '../models/exercise-topic-post-parameters';

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

  addExerciseTopic(data: ExerciseTopicPostParameters): Observable<boolean> {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('course', data.course);
    return this.http
      .post<any>('http://localhost/PLSres/api/exercise_topics', formData  )
      .pipe(map((data) => data.success));
  }

  updateExerciseTopic(
    id: number,
    data: ExerciseTopicPostParameters
  ): Observable<boolean> {
    const putData = { id, ...data };
    console.log(putData);

    return this.http
      .put<any>('http://localhost/PLSres/api/exercise_topics', putData)
      .pipe(map((res) => Boolean(res.success) ?? false));
  }
}
