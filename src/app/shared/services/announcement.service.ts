import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Announcement } from '../models/announcement.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {
  constructor(private http: HttpClient) {}

  processHttpResponses(response: Observable<any>): Observable<Announcement[]> {
    return response.pipe(
      map((announcements: any[]) =>
        announcements.map(
          (announcement: any) =>
            new Announcement(
              Number(announcement.id),
              String(announcement.title),
              String(announcement.content),
              new Date(announcement.date)
            )
        )
      )
    );
  }

  getAnnouncements(): Observable<Announcement[]> {
    return this.http
      .get<any>('http://localhost/PLSres/api/announcements')
      .pipe(this.processHttpResponses);
  }
}
