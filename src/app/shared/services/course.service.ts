import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, shareReplay, tap } from 'rxjs';
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
  private courses$?: Observable<Course[]>;

  constructor(private http: HttpClient) {}

  private transformRes = (c: ApiResponse) =>
    new Course(c.id, getCourseType(c.type));

  getCourses(useCache: boolean = true): Observable<Course[]> {
    if (!useCache || !this.courses$) {
      this.courses$ = this.http
        .get<ApiResponse[]>(`${environment.apiURL}/courses/`)
        .pipe(
          map((courses) => courses.map(this.transformRes)),
          shareReplay(1)
        );
    }

    return this.courses$;
  }
}
