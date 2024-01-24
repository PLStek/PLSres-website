import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getActionneurs(): Observable<User[]> {
    return this.http
      .get<any>(environment.apiURL + '/actionneurs')
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
