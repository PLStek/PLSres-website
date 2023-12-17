import { CourseType, getCourseTypeName } from './../utils/course-type.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Charbon } from 'src/app/shared/models/charbon.model';
import { getCourseType } from '../utils/course-type.model';
import { GetCharbonParameter } from '../models/charbon-api-parameter.model';

@Injectable({
  providedIn: 'root',
})
export class CharbonService {
  constructor(private http: HttpClient) {}

  processHttpResponses(response: Observable<any>): Observable<Charbon[]> {
    return response.pipe(
      map((chList: any[]) =>
        chList.map(
          (ch: any) =>
            new Charbon(
              Number(ch.id),
              String(ch.course),
              getCourseType(ch.course_type),
              new Date(ch.datetime),
              String(ch.title),
              ch.actionneurs.map(String),
              String(ch.description)
            )
        )
      )
    );
  }

  private setParam(params: HttpParams, name: string, value: any): HttpParams {
    if (name && value) {
      if (Array.isArray(value)) {
        params = params.set(name, value.join(','));
      } else if (value instanceof Date) {
        params = params.set(name, Math.floor(value.getTime() / 1000));
      } else {
        params = params.set(name, value.toString());
      }
    }
    return params;
  }

  getCharbonList(options: GetCharbonParameter = {}): Observable<Charbon[]> {
    let params = new HttpParams();
    params = this.setParam(params, 'courses', options.courses);
    params = this.setParam(
      params,
      'course_type',
      options.courseType ? getCourseTypeName(options.courseType) : undefined
    );
    params = this.setParam(params, 'min_date', options.minDate);
    params = this.setParam(params, 'max_date', options.maxDate);
    params = this.setParam(params, 'min_duration', options.minDuration);
    params = this.setParam(params, 'max_duration', options.maxDuration);
    params = this.setParam(params, 'null_duration', options.hasDurationOnly);
    params = this.setParam(params, 'offset', options.offset);
    params = this.setParam(params, 'limit', options.limit);

    return this.http
      .get<any[]>('http://localhost/PLSres/api/charbons', {
        params,
      })
      .pipe(this.processHttpResponses);
  }

  addCharbon(ch: Charbon): Observable<boolean> {
    let params = new HttpParams();
    params = params.set('title', ch.title);
    params = params.set('description', ch.description);
    params = params.set('datetime', ch.date.getTime() / 1000);
    params = params.set('course', ch.course);
    params = params.set('actionneurs', ch.actionners.join(','));

    return this.http
      .post<any>(`http://localhost/PLSres/api/charbons`, {
        params,
      })
      .pipe(
        map((res) => {
          return Boolean(res.success) ?? false;
        })
      );
  }

  deleteCharbon(id: number): Observable<boolean> {
    let params = new HttpParams().set('id', id);

    return this.http
      .delete<any>(`http://localhost/PLSres/api/charbons`, {
        params,
      })
      .pipe(
        map((res) => {
          return Boolean(res.success) ?? false;
        })
      );
  }
}
