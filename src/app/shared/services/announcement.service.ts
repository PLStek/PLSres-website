import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Announcement } from '../models/announcement.model';
import { Observable, map } from 'rxjs';
import { AnnouncementGetParameters } from '../models/announcement-get-parameters.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {
  constructor(private http: HttpClient) {}

  private setParam(params: HttpParams, name: string, value: any): HttpParams {
    if (name && value) {
      params = params.set(name, value.toString());
    }
    return params;
  }

  processHttpResponses(response: Observable<any>): Observable<Announcement[]> {
    response.subscribe((data) => console.log(data));
    return response.pipe(
      map((announcements: any[]) =>
        announcements.map(
          (announcement: any) =>
            new Announcement(
              Number(announcement.id),
              String(announcement.title),
              String(announcement.content),
              new Date(Number(announcement.datetime) * 1000)
            )
        )
      )
    );
  }

  getAnnouncements(
    options: AnnouncementGetParameters = {}
  ): Observable<Announcement[]> {
    let params = new HttpParams();

    params = this.setParam(params, 'limit', options.limit);
    params = this.setParam(params, 'offset', options.offset);
    params = this.setParam(params, 'sort', options.sort);

    return this.http
      .get<any>(environment.apiURL + '/announcements/', { params })
      .pipe(this.processHttpResponses);
  }
}
