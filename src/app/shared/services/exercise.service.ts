import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Exercise } from 'src/app/shared/models/exercise.model';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  constructor(private http: HttpClient) {}

  getExercises(): Observable<Exercise[]> {
    return this.http
      .get<any>('http://localhost/PLSres/api/exercises')
      .pipe(
        map((data: any) =>
          data.map(
            (element: any) =>
              new Exercise(
                Number(element.id),
                element.title,
                Number(element.difficulty),
                Number(element.topic_id),
                Boolean(element.is_corrected),
                element.source
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
    return this.getExercises().pipe(
      map((data: Exercise[]) =>
        data.find((exercise: Exercise) => exercise.id === id)
      )
    );
  }

  getExerciseContent(id: number): string {
    return `<p>Le contenu de l'exercice en HTML sera récupéré du backend</p>`;
  }
}
