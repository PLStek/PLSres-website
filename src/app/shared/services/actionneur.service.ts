import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ActionneurService {
  constructor(private http: HttpClient) {}

  getActionneurs(): Observable<User[]> {
    return this.http
      .get<any>('http://localhost/PLSres/api/actionneurs')
      .pipe(
        map((data: any) =>
          data.map(
            (element: any) =>
              new User(
                element.id,
                element.email,
                element.username,
                element.is_actionneur,
                element.is_admin
              )
          )
        )
      );
  }
}
