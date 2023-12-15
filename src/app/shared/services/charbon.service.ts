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
                element.id,
                element.id_course,
                getCourseType(element.courseType),
                new Date(element.datetime),
                element.title,
                element.actionners,
                element.description
              )
          )
        )
      );
  }
}
