import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { Exercise } from 'src/app/shared/models/exercise.model';
import { base64Decode, convertFileToBase64 } from '../utils/base64-converter';
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
              Number(element.topic_id),
              element.is_corrected ? true : false,
              String(element.source),
              element.content ? base64Decode(element.content) : undefined
            )
        )
      )
    );
  }

  getExercises(
    options: {
      maxDifficulty?: number;
      topicId?: number;
      correctedOnly?: boolean;
      content?: boolean;
    } = {}
    //TODO: replace by ExerciseGetParameters
  ): Observable<Exercise[]> {
    let params = new HttpParams();
    params = this.setParam(params, 'maxDifficulty', options.maxDifficulty);
    params = this.setParam(params, 'topicId', options.topicId);
    params = this.setParam(params, 'correctedOnly', options.correctedOnly);
    params = this.setParam(params, 'content', options.content);

    return this.http
      .get<any>(environment.apiURL + '/exercises/', { params })
      .pipe(this.processHttpResponse);
  }

  getExercise(id: number): Observable<Exercise> {
    return this.http.get<any>(environment.apiURL + '/exercises/' + id).pipe(
      map((data) => {
        return new Exercise(
          Number(data.id),
          String(data.title),
          Number(data.difficulty),
          Number(data.topic_id),
          data.is_corrected ? true : false,
          String(data.source),
          data.content ? base64Decode(data.content) : undefined
        );
      })
    );
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
