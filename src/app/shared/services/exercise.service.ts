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

  getExercises(options?: {
    id?: number;
    maxDifficulty?: number;
    topicId?: number;
    correctedOnly?: boolean;
    content?: boolean;
  }): Observable<Exercise[]> {
    return this.http
      .get<any>('http://localhost/PLSres/api/exercises?content=1')
      .pipe(
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

  getExercisesByTopic(topicId: number): Observable<Exercise[]> {
    return this.getExercises().pipe(
      map((data: Exercise[]) =>
        data.filter((exercise: Exercise) => exercise.topicId === topicId)
      )
    );
  }

  getExercisesById(id: number): Observable<Exercise | undefined> {
    return this.getExercises({ content: true }).pipe(
      map((data: Exercise[]) =>
        data.find((exercise: Exercise) => exercise.id === id)
      )
    );
  }
}
