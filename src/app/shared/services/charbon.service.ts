import { CharbonPostParameters } from './../models/charbon-post-parameters.model';
import { CourseType, getCourseTypeName } from './../utils/course-type.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Charbon } from 'src/app/shared/models/charbon.model';
import { getCourseType } from '../utils/course-type.model';
import { CharbonGetParameters } from '../models/charbon-get-parameters.model';

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
              String(ch.description),
              String(ch.replay_link),
              String(ch.resources_link)
            )
        )
      )
    );
  }

  //TODO: create util function
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

  getCharbonList(options: CharbonGetParameters = {}): Observable<Charbon[]> {
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

  addCharbon(data: CharbonPostParameters): Observable<boolean> {
    const formData = new FormData();
    formData.append('title', data.title.toString());
    formData.append('description', data.description.toString());
    formData.append('datetime', (data.date.getTime() / 1000).toString());
    formData.append('course', data.course.toString());
    formData.append('actionneurs', data.actionneurs.join(','));
    if (data.replayLink) formData.append('replay_link', data.replayLink.toString());
    if (data.resourcesLink) formData.append('resources_link', data.resourcesLink.toString());

    return this.http
      .post<any>(`http://localhost/PLSres/api/charbons`, formData)
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
