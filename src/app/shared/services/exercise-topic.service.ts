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
import { setParam } from '../utils/set_params';
import { getAuthHeader } from '../utils/auth-header';

interface ApiResponse {
  id: number;
  topic: string;
  course_id: string;
  course_type: string;
  exercise_count: number;
}

@Injectable({
  providedIn: 'root',
})
export class ExerciseTopicService {
  exerciseTopicList!: ExerciseTopic[];

  constructor(private http: HttpClient) {}

  processHttpResponses = map((data: ApiResponse[]) =>
    data.map(
      (el: ApiResponse) =>
        new ExerciseTopic(
          el.id,
          el.topic,
          el.course_id,
          getCourseType(el.course_type),
          //TODO: keep the real exercise count
          el.exercise_count ? Number(el.exercise_count) : 1
        )
    )
  );

  getExerciseTopicList(
    options: ExerciseTopicGetParameters = {}
  ): Observable<ExerciseTopic[]> {
    let params = new HttpParams();

    params = setParam(params, 'courses', options.courses);
    params = setParam(
      params,
      'course_type',
      options.courseType ? getCourseTypeName(options.courseType) : undefined
    );
    params = setParam(params, 'sort', options.sort);

    return this.http
      .get<ApiResponse[]>(`${environment.apiURL}/exercise_topics/`, { params })
      .pipe(this.processHttpResponses);
  }

  addExerciseTopic(data: ExerciseTopicPostParameters): Observable<boolean> {
    const body = {
      topic: data.title,
      course_id: data.course,
    };
    const headers = getAuthHeader();

    return this.http
      .post<any>(`${environment.apiURL}/exercise_topics/`, body, { headers })
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
    const headers = getAuthHeader();

    return this.http
      .put<any>(`${environment.apiURL}/exercise_topics/${id}`, body, {
        headers,
      })
      .pipe(map((res) => Boolean(res.success) ?? false));
  }

  deleteExerciseTopic(id: number): Observable<boolean> {
    const headers = getAuthHeader();

    return this.http
      .delete<any>(`${environment.apiURL}/exercise_topics/${id}`, { headers })
      .pipe(map((res) => Boolean(res.success) ?? false));
  }
}
