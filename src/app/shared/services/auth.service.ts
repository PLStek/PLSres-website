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

  login(login: string, password: string): Observable<boolean> {
    const body = {
      login,
      password,
    };
    console.log(body);

    return this.http.post<any>(`${environment.apiURL}/auth/login`, body).pipe(
      map((data: any) => {
        if (data) {
          const user: User = new User(
            data.id,
            data.email,
            data.username,
            data.is_actionneur,
            data.is_admin
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
    email: string,
    username: string,
    password: string
  ): Observable<boolean> {
    const body = {
      email,
      username,
      password,
    };

    return this.http
      .post<any>(`${environment.apiURL}/auth/register`, body)
      .pipe(
        map((data: any) => {
          if (data) {
            const user: User = new User(
              data.id,
              data.email,
              data.username,
              data.is_actionneur,
              data.is_admin
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

  changePassword(
    id: number,
    oldPassword: string,
    newPassword: string
  ): Observable<boolean> {
    const body = {
      password: oldPassword,
      new_password: newPassword,
    };

    return this.http
      .put<any>(`${environment.apiURL}/auth/change_password/${id}`, body)
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
