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
import { environment } from 'src/environments/environment';

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

    params = this.setParam(params, 'courses', options.courses);
    params = this.setParam(
      params,
      'course_type',
      options.courseType ? getCourseTypeName(options.courseType) : undefined
    );
    params = this.setParam(params, 'sort', options.sort);

    return this.http
      .get<any>(`${environment.apiURL}/exercise_topics/`, { params })
      .pipe(
        map((data: any) => {
          return data.map(
            (el: any) =>
              new ExerciseTopic(
                Number(el.id),
                String(el.topic),
                String(el.course_id),
                getCourseType(el.course_type),
                el.exercise_count ? Number(el.exercise_count) : 1
              )
          );
        })
      );
  }

  addExerciseTopic(data: ExerciseTopicPostParameters): Observable<boolean> {
    const body = {
      topic: data.title,
      course_id: data.course,
    };
    return this.http
      .post<any>(`${environment.apiURL}/exercise_topics/`, body)
      .pipe(map((data) => data.success));
  }

  updateExerciseTopic(
    id: number,
    data: ExerciseTopicPostParameters
  ): Observable<boolean> {
    const body = {
      topic: data.title,
      course_id: data.course,
    };

    return this.http
      .put<any>(`${environment.apiURL}/exercise_topics/${id}`, body)
      .pipe(map((res) => Boolean(res.success) ?? false));
  }

  deleteExerciseTopic(id: number): Observable<boolean> {
    return this.http
      .delete<any>(`${environment.apiURL}/exercise_topics/${id}`)
      .pipe(map((res) => Boolean(res.success) ?? false));
  }
}
