import { CourseType, getCourseTypeName } from './../utils/course-type.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Charbon } from 'src/app/shared/models/charbon.model';
import { getCourseType } from '../utils/course-type.model';
import { CharbonApiParameter } from '../models/charbon-api-parameter.model';

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

  private setParam(
    httpParams: HttpParams,
    name: string,
    value: any
  ): HttpParams {
    if (name && value) {
      if (Array.isArray(value)) {
        httpParams = httpParams.set(name, value.join(','));
      } else if (value instanceof Date) {
        httpParams = httpParams.set(name, value.getTime());
      } else {
        httpParams = httpParams.set(name, value.toString());
      }
    }
    return httpParams;
  }

  getCharbonList(
    params: CharbonApiParameter = new CharbonApiParameter()
  ): Observable<Charbon[]> {
    let httpParams = new HttpParams();
    httpParams = this.setParam(httpParams, 'courses', params.courses);
    httpParams = this.setParam(
      httpParams,
      'course_type',
      params.courseType ? getCourseTypeName(params.courseType) : undefined
    );
    httpParams = this.setParam(httpParams, 'min_date', params.minDate);
    httpParams = this.setParam(httpParams, 'max_date', params.maxDate);
    httpParams = this.setParam(httpParams, 'min_duration', params.minDuration);
    httpParams = this.setParam(httpParams, 'max_duration', params.maxDuration);
    httpParams = this.setParam(
      httpParams,
      'null_duration',
      params.hasDurationOnly
    );
    httpParams = this.setParam(httpParams, 'offset', params.offset);
    httpParams = this.setParam(httpParams, 'limit', params.limit);

    return this.http
      .get<any[]>('http://localhost/PLSres/api/charbons', {
        params: httpParams,
      })
      .pipe(this.processHttpResponses);
  }
}
