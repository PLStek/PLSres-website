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

  login(code: string): Observable<boolean> {
    const body = {
      code,
    };

    return this.http.post<any>(`${environment.apiURL}/auth/token`, body).pipe(
      map((data: any) => {
        console.log(data);
        this.get_user(data.token).subscribe();
        return false;
      })
    );
  }

  get_user(token: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http
      .get<any>(`${environment.apiURL}/auth/me`, { headers })
      .pipe(
        map((data: any) => {
          console.log(data);
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
