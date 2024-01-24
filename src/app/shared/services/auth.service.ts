import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map, takeUntil } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private userSubject = new BehaviorSubject<User | undefined>(
    this.getStoredUser()
  );
  private destroy$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  login(login: String, password: String): Observable<boolean> {
    const formData = new FormData();
    formData.append('loginInfo', login.toString());
    formData.append('password', password.toString());

    return this.http
      .post<any>(environment.apiURL + '/login', formData)
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
            this.userSubject.next(user);
            return true;
          } else {
            return false;
          }
        })
      );
  }

  register(
    email: String,
    username: String,
    password: String
  ): Observable<boolean> {
    const formData = new FormData();
    formData.append('email', email.toString());
    formData.append('username', username.toString());
    formData.append('password', password.toString());

    return this.http
      .post<any>(environment.apiURL + '/register', formData)
      .pipe(
        map((data: any) => {
          if (data.success) {
            return true;
          } else {
            return false;
          }
        })
      );
  }

  changePassword(
    email: String,
    oldPassword: String,
    newPassword: String
  ): Observable<boolean> {
    const formData = new FormData();
    formData.append('email', email.toString());
    formData.append('oldPassword', oldPassword.toString());
    formData.append('newPassword', newPassword.toString());

    return this.http
      .post<any>(environment.apiURL + '/change_password', formData)
      .pipe(
        map((data: any) => {
          if (data.success) {
            return true;
          } else {
            return false;
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('user');
    this.userSubject.next(undefined);
  }

  getLoggedUser(): Observable<User | undefined> {
    return this.userSubject.asObservable().pipe(takeUntil(this.destroy$));
  }

  isLogged(): Observable<boolean> {
    return this.getLoggedUser().pipe(map((user) => user !== undefined));
  }

  private getStoredUser(): User | undefined {
    if (!localStorage.getItem('user')) {
      return undefined;
    }

    const data = JSON.parse(localStorage.getItem('user') || '{}');
    return new User(
      data.id,
      data.email,
      data.username,
      data.isActionneur,
      data.isAdmin
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
