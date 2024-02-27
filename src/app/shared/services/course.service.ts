import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Course } from '../models/course.model';
import { getCourseType } from '../utils/course-type.model';
import { environment } from 'src/environments/environment';

interface ApiResponse {
  id: string;
  type: string;
}

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private http: HttpClient) {}

  private transformRes = (c: ApiResponse) =>
    new Course(c.id, getCourseType(c.type));

  getCourses(): Observable<Course[]> {
    return this.http
      .get<ApiResponse[]>(`${environment.apiURL}/courses/`)
      .pipe(map((courses) => courses.map(this.transformRes)));
  }
}
