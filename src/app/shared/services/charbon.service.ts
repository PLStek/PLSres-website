import { CharbonPostParameters } from './../models/charbon-post-parameters.model';
import { CourseType, getCourseTypeName } from './../utils/course-type.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Charbon } from 'src/app/shared/models/charbon.model';
import { getCourseType } from '../utils/course-type.model';
import { CharbonGetParameters } from '../models/charbon-get-parameters.model';
import { environment } from 'src/environments/environment';
import { setParam } from '../utils/set-params';
import { getAuthHeader } from '../utils/auth-header';

interface ApiResponse {
  id: number;
  course_id: string;
  course_type: string;
  datetime: number;
  title: string;
  actionneurs: string[];
  description: string;
  replay_link?: string;
  duration?: number;
}

@Injectable({
  providedIn: 'root',
})
export class CharbonService {
  constructor(private http: HttpClient) {
    console.log('CharbonService created');
  }

  private transformRes = (ch: ApiResponse) =>
    new Charbon(
      ch.id,
      ch.course_id,
      getCourseType(ch.course_type),
      new Date(ch.datetime * 1000),
      ch.title,
      ch.actionneurs,
      ch.description,
      ch.replay_link,
      ch.duration
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
      .get<ApiResponse[]>(`${environment.apiURL}/charbons/`, {
        params,
      })
      .pipe(map((chList) => chList.map(this.transformRes)));
  }

  addCharbon(data: CharbonPostParameters): Observable<Charbon> {
    const body = {
      title: data.title,
      description: data.description,
      datetime: data.date.getTime() / 1000,
      course_id: data.course,
      actionneurs: data.actionneurs,
      replay_link: data.replayLink,
    };

    const headers = getAuthHeader();

    return this.http
      .post<ApiResponse>(`${environment.apiURL}/charbons/`, body, { headers })
      .pipe(map(this.transformRes));
  }

  updateCharbon(id: number, data: CharbonPostParameters): Observable<Charbon> {
    const body = {
      title: data.title,
      description: data.description,
      datetime: data.date.getTime() / 1000,
      course_id: data.course,
      actionneurs: data.actionneurs,
      replay_link: data.replayLink,
    };

    const headers = getAuthHeader();

    return this.http
      .put<ApiResponse>(`${environment.apiURL}/charbons/${id}/`, body, {
        headers,
      })
      .pipe(map(this.transformRes));
  }

  deleteCharbon(id: number): Observable<null> {
    const headers = getAuthHeader();
    return this.http.delete<null>(`${environment.apiURL}/charbons/${id}/`, {
      headers,
    });
  }
}
