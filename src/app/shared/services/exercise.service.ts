import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, shareReplay, switchMap } from 'rxjs';
import { Exercise } from 'src/app/shared/models/exercise.model';
import { base64Decode, convertFileToBase64 } from '../utils/base64-converter';
import { ExercisePostParameters } from 'src/app/shared/models/exercise-post-parameters.model';
import { environment } from 'src/environments/environment';
import { setParam } from '../utils/set-params';
import { getAuthHeader } from '../utils/auth-header';

interface ApiResponse {
  id: number;
  title: string;
  difficulty: number;
  topic_id: number;
  is_corrected: boolean;
  source: string;
  copyright: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  private cache: Map<number, Observable<Exercise[]>> = new Map();

  constructor(private http: HttpClient) {}

  private transformRes = (element: ApiResponse) =>
    new Exercise(
      element.id,
      element.title,
      element.difficulty,
      element.topic_id,
      element.is_corrected ? true : false,
      element.source,
      element.copyright ? true : false /* 
      element.content ? base64Decode(element.content) : undefined */
    );

  getExercises(
    topicId: number,
    useCache: boolean = true
  ): Observable<Exercise[]> {
    let params = new HttpParams();
    params = setParam(params, 'topic_id', topicId);

    if (!useCache || !this.cache.has(topicId)) {
      let exercises$ = this.http
        .get<ApiResponse[]>(`${environment.apiURL}/exercises/`, { params })
        .pipe(
          map((data) => data.map(this.transformRes)),
          shareReplay(1)
        );

      this.cache.set(topicId, exercises$);
    }

    return this.cache.get(topicId)!;
  }

  getExercise(id: number): Observable<Exercise> {
    return this.http
      .get<ApiResponse>(`${environment.apiURL}/exercises/${id}/`)
      .pipe(map(this.transformRes));
  }

  getExerciseContent(id: number): Observable<string> {
    const headers = getAuthHeader();
    return this.http.get(`${environment.apiURL}/exercises/${id}/content/`, {
      headers,
      responseType: 'text',
    });
  }

  addExercise(data: ExercisePostParameters): Observable<Exercise> {
    return convertFileToBase64(data).pipe(
      switchMap((base64data) => {
        const body = {
          title: data.title,
          difficulty: data.difficulty,
          is_corrected: data.isCorrected,
          topic_id: data.topicId,
          source: data.source,
          copyright: true,
          content: base64data,
        };

        const headers = getAuthHeader();
        return this.http
          .post<ApiResponse>(`${environment.apiURL}/exercises/`, body, {
            headers,
          })
          .pipe(map(this.transformRes));
      })
    );
  }

  updateExercise(
    id: number,
    data: ExercisePostParameters
  ): Observable<Exercise> {
    return convertFileToBase64(data).pipe(
      switchMap((base64data) => {
        const body = {
          title: data.title,
          difficulty: data.difficulty,
          is_corrected: data.isCorrected,
          topic_id: data.topicId,
          source: data.source,
          copyright: true,
          content: base64data,
        };

        const headers = getAuthHeader();
        return this.http
          .put<ApiResponse>(`${environment.apiURL}/exercises/${id}/`, body, {
            headers,
          })
          .pipe(map(this.transformRes));
      })
    );
  }

  deleteExercise(id: number): Observable<null> {
    const headers = getAuthHeader();
    return this.http.delete<null>(`${environment.apiURL}/exercises/${id}/`, {
      headers,
    });
  }
}
