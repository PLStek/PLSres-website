import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Course } from '../models/course.model';
import { getCourseType } from '../utils/course-type.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<any>(`${environment.apiURL}/courses`).pipe(
      map((data: any) =>
        data.map((element: any) => ({
          id: element.id,
          type: getCourseType(element.type),
        }))
      )
    );
  }
}
