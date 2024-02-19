import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { Exercise } from 'src/app/shared/models/exercise.model';
import { base64Decode, convertFileToBase64 } from '../utils/base64-converter';
import { ExercisePostParameters } from 'src/app/shared/models/exercise-post-parameters.model';
import { environment } from 'src/environments/environment';
import { setParam } from '../utils/set_params';
import { getAuthHeader } from '../utils/auth-header';

interface ApiResponse {
  id: number;
  title: string;
  difficulty: number;
  topic_id: number;
  is_corrected: boolean;
  source: string;
  content: string;
}

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  constructor(private http: HttpClient) {}

  elementToExercise = (element: ApiResponse) =>
    new Exercise(
      element.id,
      element.title,
      element.difficulty,
      element.topic_id,
      element.is_corrected ? true : false,
      element.source,
      element.content ? base64Decode(element.content) : undefined
    );

  processHttpResponse = map((data: ApiResponse[]) =>
    data.map(this.elementToExercise)
  );

  processSingleHttpResponse = map((data: ApiResponse) =>
    this.elementToExercise(data)
  );

  getExercises(
    //TODO: replace by ExerciseGetParameters
    options: {
      topicId?: number;
      content?: boolean;
    } = {}
  ): Observable<Exercise[]> {
    let params = new HttpParams();
    params = setParam(params, 'topic_id', options.topicId);
    params = setParam(params, 'content', options.content);

    return this.http
      .get<ApiResponse[]>(`${environment.apiURL}/exercises/`, { params })
      .pipe(this.processHttpResponse);
  }

  getExercise(id: number): Observable<Exercise> {
    return this.http
      .get<ApiResponse>(`${environment.apiURL}/exercises/${id}`)
      .pipe(this.processSingleHttpResponse);
  }

  addExercise(data: ExercisePostParameters): Observable<boolean> {
    return convertFileToBase64(data).pipe(
      switchMap((base64data) => {
        const body = {
          title: data.title,
          difficulty: data.difficulty,
          is_corrected: data.isCorrected,
          topic_id: data.topicId,
          source: data.source,
          content: base64data,
        };

        return this.http
          .post<any>(`${environment.apiURL}/exercises`, body)
          .pipe(
            map((res) => {
              return Boolean(res.success) ?? false;
            })
          );
      })
    );
  }

  updateExercise(
    id: number,
    data: ExercisePostParameters
  ): Observable<boolean> {
    return convertFileToBase64(data).pipe(
      switchMap((base64data) => {
        const body = {
          title: data.title,
          difficulty: data.difficulty,
          is_corrected: data.isCorrected,
          topic_id: data.topicId,
          source: data.source,
          content: base64data,
        };

        return this.http
          .put<any>(`${environment.apiURL}/exercises/${id}`, body)
          .pipe(
            map((res) => {
              return Boolean(res.success) ?? false;
            })
          );
      })
    );
  }

  deleteExercise(id: number): Observable<boolean> {
    let params = new HttpParams().set('id', id);

    return this.http
      .delete<any>(`${environment.apiURL}/exercises/`, { params })
      .pipe(map((res) => Boolean(res.success) ?? false));
  }
}
