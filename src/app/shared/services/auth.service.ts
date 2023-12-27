import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map, takeUntil } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private userSubject = new BehaviorSubject<User | undefined>(
    this.getStoredUser()
  );
  private destroy$ = new Subject<void>();

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
            this.userSubject.next(user);
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
  ): Observable<boolean> {
    const formData = new FormData();
    formData.append('email', email.toString());
    formData.append('username', username.toString());
    formData.append('password', password.toString());

    return this.http.post<any>(
      'http://localhost/PLSres/api/register',
      formData
    );
    //TODO: return bool
  }

  logout(): void {
    localStorage.removeItem('user');
    this.userSubject.next(undefined);
  }

  getLoggedUser(): Observable<User | undefined> {
    return this.userSubject.asObservable().pipe(takeUntil(this.destroy$));
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
