import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';

interface ApiResponse {
  id: string;
  email: string;
  username: string;
  is_actionneur: boolean;
  is_admin: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  private transformRes = (u: ApiResponse) =>
    new User(u.id, u.username, u.is_admin);

  getActionneurs(): Observable<User[]> {
    return this.http
      .get<any>(`${environment.apiURL}/actionneurs/`)
      .pipe(map((users: ApiResponse[]) => users.map(this.transformRes)));
  }
}
