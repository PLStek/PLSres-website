import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Charbon } from 'src/app/shared/models/charbon.model';
import { getCourseType } from '../utils/course-type.model';

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
              String(ch.id_course),
              getCourseType(ch.courseType),
              new Date(ch.datetime),
              String(ch.title),
              ch.actionners.map(String),
              String(ch.description)
            )
        )
      )
    );
  }

  getCharbonList(courses?: String[]): Observable<Charbon[]> {
    let params = new HttpParams();
    if (courses && courses.length > 0) {
      params = params.set('courses', courses.join(','));
    }

    return this.http
      .get<any[]>('http://localhost/PLSres/api/charbons', { params })
      .pipe(this.processHttpResponses);
  }
}
