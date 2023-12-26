import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(login: String, password: String): Observable<User | undefined> {
    const formData = new FormData();
    formData.append('email', login.toString());
    formData.append('password', password.toString());

    return this.http
      .post<any>('http://localhost/PLSres/api/login', formData)
      .pipe(
        map((data: any) => {
          if (data.success) {
            const user: User = new User(
              data.user.id,
              data.user.email,
              data.user.username,
              data.user.actionneur,
              data.user.admin
            );
            localStorage.setItem('user', JSON.stringify(user));
            return user;
          } else {
            return undefined;
          }
        })
      );
  }

  register(
    email: String,
    username: String,
    password: String
  ): Observable<User | undefined> {
    const formData = new FormData();
    formData.append('email', email.toString());
    formData.append('username', username.toString());
    formData.append('password', password.toString());

    return this.http.post<User>(
      'http://localhost/PLSres/api/register',
      formData
    );
    //TODO: return user
  }

  isLogged(): boolean {
    return localStorage.getItem('user') !== null;
  }

  getLoggedUser(): User | undefined {
    const data = JSON.parse(localStorage.getItem('user') || '{}');
    return new User(
      data.id,
      data.email,
      data.username,
      data.isActionneur,
      data.isAdmin
    );
  }

  logout(): void {
    localStorage.removeItem('user');
  }
}
