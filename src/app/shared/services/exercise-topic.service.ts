import { Injectable } from '@angular/core';
import {
  getCourseType,
  getCourseTypeName,
} from 'src/app/shared/utils/course-type.model';
import { ExerciseTopic } from 'src/app/shared/models/exercise-topic.model';
import { Observable, map, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ExerciseTopicPostParameters } from '../models/exercise-topic-post-parameters';
import { ExerciseTopicGetParameters } from '../models/exercise-topic-get-parameters.model';

@Injectable({
  providedIn: 'root',
})
export class ExerciseTopicService {
  exerciseTopicList!: ExerciseTopic[];

  constructor(private http: HttpClient) {}

  private setParam(params: HttpParams, name: string, value: any): HttpParams {
    if (name && value) {
      params = params.set(name, value.toString());
    }
    return params;
  }

  getExerciseTopicList(
    options: ExerciseTopicGetParameters = {}
  ): Observable<ExerciseTopic[]> {
    let params = new HttpParams();

    params = this.setParam(params, 'id', options.id);
    params = this.setParam(params, 'courses', options.courses);
    params = this.setParam(
      params,
      'courseType',
      options.courseType ? getCourseTypeName(options.courseType) : undefined
    );
    params = this.setParam(params, 'sort', options.sort);

    return this.http
      .get<any>('http://localhost/PLSres/api/exercise_topics', { params })
      .pipe(
        map((data: any) => {
          return data.map(
            (el: any) =>
              new ExerciseTopic(
                Number(el.id),
                String(el.topic),
                String(el.course),
                getCourseType(el.course_type),
                Number(el.exercise_count)
              )
          );
        })
      );
  }

  addExerciseTopic(data: ExerciseTopicPostParameters): Observable<boolean> {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('course', data.course);
    return this.http
      .post<any>('http://localhost/PLSres/api/exercise_topics', formData)
      .pipe(map((data) => data.success));
  }

  updateExerciseTopic(
    id: number,
    data: ExerciseTopicPostParameters
  ): Observable<boolean> {
    const putData = { id, ...data };

    return this.http
      .put<any>('http://localhost/PLSres/api/exercise_topics', putData)
      .pipe(map((res) => Boolean(res.success) ?? false));
  }

  deleteExerciseTopic(id: number): Observable<boolean> {
    let params = new HttpParams().set('id', id);

    return this.http
      .delete<any>('http://localhost/PLSres/api/exercise_topics', {
        params,
      })
      .pipe(map((res) => Boolean(res.success) ?? false));
  }
}
