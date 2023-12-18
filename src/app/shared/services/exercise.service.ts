import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Exercise } from 'src/app/shared/models/exercise.model';
import { base64Decode } from '../utils/base64-converter';

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
              Boolean(element.is_corrected),
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
  ): Observable<Exercise[]> {
    let params = new HttpParams();
    params = this.setParam(params, 'id', options.id);
    params = this.setParam(params, 'max_difficulty', options.maxDifficulty);
    params = this.setParam(params, 'topic_id', options.topicId);
    params = this.setParam(params, 'corrected_only', options.correctedOnly);
    params = this.setParam(params, 'content', options.content);

    return this.http
      .get<any>('http://localhost/PLSres/api/exercises', { params })
      .pipe(this.processHttpResponse);
  }

  addExercise(ex: Exercise, content: File): Observable<boolean> {
    const formData = new FormData();
    formData.append('title', ex.title);
    formData.append('difficulty', ex.difficulty.toString());
    formData.append('is_corrected', ex.isCorrected.toString());
    formData.append('topic_id', ex.topicId.toString());
    formData.append('source', ex.source);
    formData.append('thumbnail', content);

    return this.http
      .post<any>('http://localhost/PLSres/api/exercises', formData)
      .pipe(
        map((res) => {
          return Boolean(res.success) ?? false;
        })
      );
  }
}
