import { CharbonPostParameters } from './../models/charbon-post-parameters.model';
import { CourseType, getCourseTypeName } from './../utils/course-type.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Charbon } from 'src/app/shared/models/charbon.model';
import { getCourseType } from '../utils/course-type.model';
import { CharbonGetParameters } from '../models/charbon-get-parameters.model';
import { environment } from 'src/environments/environment';

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
              new Date(Number(ch.date) * 1000),
              String(ch.title),
              ch.actionneurs.map(String),
              String(ch.description),
              ch.replay_link,
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
      'courseType',
      options.courseType ? getCourseTypeName(options.courseType) : undefined
    );
    params = this.setParam(params, 'minDate', options.minDate);
    params = this.setParam(params, 'maxDate', options.maxDate);
    params = this.setParam(params, 'minDuration', options.minDuration);
    params = this.setParam(params, 'maxDuration', options.maxDuration);
    params = this.setParam(params, 'nullDuration', options.hasDurationOnly);
    params = this.setParam(params, 'offset', options.offset);
    params = this.setParam(params, 'limit', options.limit);
    params = this.setParam(params, 'sort', options.sort);

    return this.http
      .get<any[]>(environment.apiURL + '/charbons', {
        params,
      })
      .pipe(this.processHttpResponses);
  }

  addCharbon(data: CharbonPostParameters): Observable<boolean> {
    const formData = new FormData();
    formData.append('title', data.title.toString());
    formData.append('description', data.description.toString());
    formData.append('date', (data.date.getTime() / 1000).toString());
    formData.append('course', data.course.toString());
    formData.append('actionneurs', data.actionneurs.join(','));
    if (data.replayLink)
      formData.append('replayLink', data.replayLink.toString());
    if (data.resourcesLink)
      formData.append('resourcesLink', data.resourcesLink.toString());
    return this.http
      .post<any>(environment.apiURL + '/charbons', formData)
      .pipe(
        map((res) => {
          return Boolean(res.success) ?? false;
        })
      );
  }

  updateCharbon(id: number, data: CharbonPostParameters): Observable<boolean> {
    const putData = {
      id,
      title: data.title,
      description: data.description,
      date: (data.date.getTime() / 1000).toString(),
      course: data.course,
      actionneurs: data.actionneurs,
      replayLink: data.replayLink,
      resourcesLink: data.resourcesLink,
    };

    return this.http
      .put<any>(environment.apiURL + '/charbons', putData)
      .pipe(map((res) => Boolean(res.success) ?? false));
  }

  deleteCharbon(id: number): Observable<boolean> {
    let params = new HttpParams().set('id', id);

    return this.http
      .delete<any>(environment.apiURL + '/charbons', {
        params,
      })
      .pipe(map((res) => Boolean(res.success) ?? false));
  }
}
