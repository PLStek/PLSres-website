import { Injectable } from '@angular/core';
import { getCourseType } from 'src/app/shared/utils/course-type.model';
import { ExerciseTopic } from 'src/app/shared/models/exercise-topic.model';
import { Observable, map, shareReplay, tap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ExerciseTopicPostParameters } from '../models/exercise-topic-post-parameters';
import { environment } from 'src/environments/environment';
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
  private exerciseTopics$?: Observable<ExerciseTopic[]>;

  constructor(private http: HttpClient) {}

  private transformRes = (el: ApiResponse) =>
    new ExerciseTopic(
      el.id,
      el.topic,
      el.course_id,
      getCourseType(el.course_type),
      //TODO: keep the real exercise count
      el.exercise_count ? Number(el.exercise_count) : 1
    );

  private addTopicToCache(topic: ExerciseTopic) {
    if (this.exerciseTopics$) {
      this.exerciseTopics$ = this.exerciseTopics$.pipe(
        map((topics) => [...topics, topic]),
        shareReplay(1)
      );
    }
  }

  private updateTopicInCache(topic: ExerciseTopic) {
    if (this.exerciseTopics$) {
      this.exerciseTopics$ = this.exerciseTopics$.pipe(
        map((topics) => topics.map((t) => (t.id === topic.id ? topic : t))),
        shareReplay(1)
      );
    }
  }

  private removeTopicFromCache(id: number) {
    if (this.exerciseTopics$) {
      this.exerciseTopics$ = this.exerciseTopics$.pipe(
        map((topics) => topics.filter((t) => t.id !== id)),
        shareReplay(1)
      );
    }
  }

  getExerciseTopicList(useCache: boolean = true): Observable<ExerciseTopic[]> {
    if (!useCache || !this.exerciseTopics$) {
      this.exerciseTopics$ = this.http
        .get<ApiResponse[]>(`${environment.apiURL}/exercise_topics/`)
        .pipe(
          map((data) => data.map(this.transformRes)),
          shareReplay(1)
        );
    }

    return this.exerciseTopics$;
  }

  addExerciseTopic(
    data: ExerciseTopicPostParameters
  ): Observable<ExerciseTopic> {
    const body = {
      topic: data.title,
      course_id: data.course,
    };
    const headers = getAuthHeader();

    return this.http
      .post<ApiResponse>(`${environment.apiURL}/exercise_topics/`, body, {
        headers,
      })
      .pipe(
        map(this.transformRes),
        tap((et) => this.addTopicToCache(et))
      );
  }

  updateExerciseTopic(
    id: number,
    data: ExerciseTopicPostParameters
  ): Observable<ExerciseTopic> {
    const body = {
      topic: data.title,
      course_id: data.course,
    };
    const headers = getAuthHeader();

    return this.http
      .put<ApiResponse>(`${environment.apiURL}/exercise_topics/${id}/`, body, {
        headers,
      })
      .pipe(
        map(this.transformRes),
        tap((et) => this.updateTopicInCache(et))
      );
  }

  deleteExerciseTopic(id: number): Observable<null> {
    const headers = getAuthHeader();
    return this.http
      .delete<null>(`${environment.apiURL}/exercise_topics/${id}/`, { headers })
      .pipe(tap(() => this.removeTopicFromCache(id)));
  }
}
