import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Announcement } from '../models/announcement.model';
import { Observable, map, shareReplay } from 'rxjs';
import { AnnouncementGetParameters } from '../models/announcement-get-parameters.model';
import { environment } from 'src/environments/environment';
import { setParam } from '../utils/set-params';

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
  private announcements$?: Observable<Announcement[]>;

  constructor(private http: HttpClient) {}

  private transformRes = (a: ApiResponse) =>
    new Announcement(a.id, a.title, a.content, new Date(a.datetime * 1000));

  getAnnouncements(
    options: AnnouncementGetParameters = {},
    useCache: boolean = true
  ): Observable<Announcement[]> {
    let params = new HttpParams();

    params = setParam(params, 'limit', options.limit);
    params = setParam(params, 'offset', options.offset);
    params = setParam(params, 'sort', options.sort);

    if (!useCache || !this.announcements$) {
      this.announcements$ = this.http
        .get<ApiResponse[]>(`${environment.apiURL}/announcements/`, { params })
        .pipe(
          map((announcements) => announcements.map(this.transformRes)),
          shareReplay(1)
        );
    }

    return this.announcements$;
  }
}
