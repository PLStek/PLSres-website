import { CharbonPostParameters } from './../models/charbon-post-parameters.model';
import { CourseType, getCourseTypeName } from './../utils/course-type.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Charbon } from 'src/app/shared/models/charbon.model';
import { getCourseType } from '../utils/course-type.model';
import { CharbonGetParameters } from '../models/charbon-get-parameters.model';
import { environment } from 'src/environments/environment';
import { setParam } from '../utils/set_params';

@Injectable({
  providedIn: 'root',
})
export class CharbonService {
  constructor(private http: HttpClient) {}

  processHttpResponses = map((chList: any[]) =>
    chList.map(
      (ch: any) =>
        new Charbon(
          Number(ch.id),
          String(ch.course_id),
          getCourseType(ch.course_type),
          new Date(Number(ch.datetime) * 1000),
          String(ch.title),
          ch.actionneurs.map(String),
          String(ch.description),
          ch.replay_link,
          String(ch.resources_link)
        )
    )
  );

  getCharbonList(options: CharbonGetParameters = {}): Observable<Charbon[]> {
    let params = new HttpParams();
    params = setParam(params, 'course', options.course);
    params = setParam(
      params,
      'course_type',
      options.courseType ? getCourseTypeName(options.courseType) : undefined
    );
    params = setParam(params, 'min_date', options.minDate);
    params = setParam(params, 'max_date', options.maxDate);
    params = setParam(params, 'offset', options.offset);
    params = setParam(params, 'limit', options.limit);
    params = setParam(params, 'sort', options.sort);

    return this.http
      .get<any[]>(`${environment.apiURL}/charbons/`, {
        params,
      })
      .pipe(this.processHttpResponses);
  }

  addCharbon(data: CharbonPostParameters): Observable<boolean> {
    const body = {
      title: data.title,
      description: data.description,
      datetime: data.date.getTime() / 1000,
      course_id: data.course,
      actionneurs: data.actionneurs,
      replay_link: data.replayLink,
    };
    return this.http.post<any>(`${environment.apiURL}/charbons/`, body).pipe(
      map((res) => {
        return Boolean(res.success) ?? false;
      })
    );
  }

  updateCharbon(id: number, data: CharbonPostParameters): Observable<boolean> {
    const body = {
      title: data.title,
      description: data.description,
      datetime: data.date.getTime() / 1000,
      course_id: data.course,
      actionneurs: data.actionneurs,
      replay_link: data.replayLink,
    };

    return this.http
      .put<any>(`${environment.apiURL}/charbons/${id}`, body)
      .pipe(map((res) => Boolean(res.success) ?? false));
  }

  deleteCharbon(id: number): Observable<boolean> {
    return this.http
      .delete<any>(`${environment.apiURL}/charbons/${id}`)
      .pipe(map((res) => Boolean(res.success) ?? false));
  }
}
