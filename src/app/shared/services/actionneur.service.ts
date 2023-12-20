import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActionneurService {
  constructor(private http: HttpClient) {}

  getActionneurs(): Observable<String[]> {
    return this.http
      .get<any>('http://localhost/PLSres/api/actionneurs')
      .pipe(
        map((data: any) => data.map((element: any) => String(element.username)))
      );
  }
}
