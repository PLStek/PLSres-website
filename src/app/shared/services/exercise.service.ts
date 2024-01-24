import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Exercise } from 'src/app/shared/models/exercise.model';
import { base64Decode } from '../utils/base64-converter';
import { ExerciseTopic } from '../models/exercise-topic.model';
import { ExercisePostParameters } from 'src/app/shared/models/exercise-post-parameters.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  constructor(private http: HttpClient) {}

  private setParam(params: HttpParams, name: string, value: any): HttpParams {
    if (name && value) {
      params = params.set(name, value.toString());
    }
    return params;
  }

  private processHttpResponse(
    response: Observable<any>
  ): Observable<Exercise[]> {
    return response.pipe(
      map((data: any) =>
        data.map(
          (element: any) =>
            new Exercise(
              Number(element.id),
              String(element.title),
              Number(element.difficulty),
              Number(element.topicId),
              element.isCorrected == '1' ? true : false,
              String(element.source),
              element.content ? base64Decode(element.content) : undefined
            )
        )
      )
    );
  }

  getExercises(
    options: {
      id?: number;
      maxDifficulty?: number;
      topicId?: number;
      correctedOnly?: boolean;
      content?: boolean;
    } = {}
    //TODO: replace by ExerciseGetParameters
  ): Observable<Exercise[]> {
    let params = new HttpParams();
    params = this.setParam(params, 'id', options.id);
    params = this.setParam(params, 'maxDifficulty', options.maxDifficulty);
    params = this.setParam(params, 'topicId', options.topicId);
    params = this.setParam(params, 'correctedOnly', options.correctedOnly);
    params = this.setParam(params, 'content', options.content);

    return this.http
      .get<any>(environment.apiURL + '/exercises', { params })
      .pipe(this.processHttpResponse);
  }

  addExercise(data: ExercisePostParameters): Observable<boolean> {
    const formData = new FormData();
    formData.append('title', data.title.toString());
    formData.append('difficulty', data.difficulty.toString());
    formData.append('isCorrected', data.isCorrected ? '1' : '0');
    formData.append('topicId', data.topicId.toString());
    formData.append('source', data.source.toString());
    formData.append('content', data.content);

    return this.http
      .post<any>(environment.apiURL + '/exercises', formData)
      .pipe(
        map((res) => {
          return Boolean(res.success) ?? false;
        })
      );
  }

  updateExercise(
    id: number,
    data: ExercisePostParameters
  ): Observable<boolean> {
    const putData = { id, ...data };

    return this.http
      .put<any>(environment.apiURL + '/exercises', putData)
      .pipe(
        map((res) => {
          return Boolean(res.success) ?? false;
        })
      );
  }

  deleteExercise(id: number): Observable<boolean> {
    let params = new HttpParams().set('id', id);

    return this.http
      .delete<any>(environment.apiURL + '/exercises', { params })
      .pipe(map((res) => Boolean(res.success) ?? false));
  }
}
