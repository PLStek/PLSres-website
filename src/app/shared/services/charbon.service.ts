import { CharbonPostParameters } from './../models/charbon-post-parameters.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, map, shareReplay, tap } from 'rxjs';
import { Charbon } from 'src/app/shared/models/charbon.model';
import { getCourseType } from '../utils/course-type.model';
import { environment } from 'src/environments/environment';
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
  resources: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CharbonService {
  private charbons$?: Observable<Charbon[]>;
  private newCharbonMinDate?: Date;
  private fetchedAll = false;

  constructor(private http: HttpClient) {}

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
      ch.duration,
      ch.resources
    );

  private addCharbonsToCache(charbons: Charbon[]) {
    if (this.charbons$) {
      this.charbons$ = this.charbons$.pipe(
        map((chList) => chList.concat(charbons)),
        shareReplay(1)
      );
    }
  }

  getCharbonList(
    fetchOld: boolean = false,
    useCache: boolean = true
  ): Observable<Charbon[]> {
    if (this.newCharbonMinDate && this.charbons$) {
      return this.charbons$;
    }

    let params = new HttpParams();

    if (!this.newCharbonMinDate) {
      const now = new Date();
      now.setFullYear(now.getFullYear() - 1);
      this.newCharbonMinDate = now;
      params = params.set('min_date', (now.getTime() / 1000).toFixed(0));
    } else {
      params = params.set(
        'max_date',
        (this.newCharbonMinDate.getTime() / 1000).toFixed(0)
      );
    }

    if (!this.fetchedAll || !useCache || !this.charbons$) {
      this.charbons$ = this.http
        .get<ApiResponse[]>(`${environment.apiURL}/charbons/`, {
          params,
        })
        .pipe(
          map((chList) => chList.map(this.transformRes)),
          tap((charbons) => {
            this.addCharbonsToCache(charbons);
            if (this.newCharbonMinDate) this.fetchedAll = true;
          }),
          shareReplay(1)
        );
    }

    return this.charbons$;
  }

  getCharbonContent(id: number): Observable<Blob> {
    const headers = getAuthHeader();
    return this.http.get(`${environment.apiURL}/charbons/${id}/content/`, {
      headers,
      responseType: 'blob',
    });
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

  addCharbonContent(id: number, content: File): Observable<null> {
    const headers = getAuthHeader();
    const formData = new FormData();

    formData.append('file', content);
    return this.http.post<null>(
      `${environment.apiURL}/charbons/${id}/content/`,
      formData,
      { headers }
    );
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

  updateCharbonContent(id: number, content: File): Observable<null> {
    const headers = getAuthHeader();
    const formData = new FormData();

    formData.append('file', content);
    return this.http.put<null>(
      `${environment.apiURL}/charbons/${id}/content/`,
      formData,
      { headers }
    );
  }

  deleteCharbon(id: number): Observable<null> {
    const headers = getAuthHeader();
    return this.http.delete<null>(`${environment.apiURL}/charbons/${id}/`, {
      headers,
    });
  }
}
