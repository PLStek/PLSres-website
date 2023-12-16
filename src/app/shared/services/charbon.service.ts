import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Charbon } from 'src/app/shared/models/charbon.model';
import { getCourseType } from '../utils/course-type.model';

@Injectable({
  providedIn: 'root',
})
export class CharbonService {
  constructor(private http: HttpClient) {}

  getCharbonList(): Observable<Charbon[]> {
    return this.http
      .get<any>('http://localhost/PLSres/api/charbons')
      .pipe(
        map((data: any) =>
          data.map(
            (element: any) =>
              new Charbon(
                Number(element.id),
                String(element.id_course),
                getCourseType(element.courseType),
                new Date(element.datetime),
                String(element.title),
                element.actionners.map(String),
                String(element.description)
              )
          )
        )
      );
  }
}
