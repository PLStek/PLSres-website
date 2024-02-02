import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Announcement } from '../models/announcement.model';
import { Observable, map } from 'rxjs';
import { AnnouncementGetParameters } from '../models/announcement-get-parameters.model';
import { environment } from 'src/environments/environment';
import { setParam } from '../utils/set_params';

interface ApiResponse {
  id: number;
  title: string;
  content: string;
  datetime: number;
}

@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {
  constructor(private http: HttpClient) {}

  processHttpResponses = map((announcements: ApiResponse[]) =>
    announcements.map(
      (a: ApiResponse) =>
        new Announcement(
          Number(a.id),
          String(a.title),
          String(a.content),
          new Date(Number(a.datetime) * 1000)
        )
    )
  );

  getAnnouncements(
    options: AnnouncementGetParameters = {}
  ): Observable<Announcement[]> {
    let params = new HttpParams();

    params = setParam(params, 'limit', options.limit);
    params = setParam(params, 'offset', options.offset);
    params = setParam(params, 'sort', options.sort);

    return this.http
      .get<ApiResponse[]>(`${environment.apiURL}/announcements/`, { params })
      .pipe(this.processHttpResponses);
  }
}
