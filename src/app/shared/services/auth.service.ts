import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private loggedSubject = new BehaviorSubject<boolean>(
    localStorage.getItem('token') != null
  );

  private actionneurSubject = new BehaviorSubject<boolean>(
    localStorage.getItem('actionneur') === 'true' ? true : false
  );

  private destroy$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  private getUser(token: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http
      .get<any>(`${environment.apiURL}/auth/me`, { headers })
      .pipe(
        map((data: any) => {
          localStorage.setItem('token', token);
          localStorage.setItem('actionneur', data.is_actionneur);
          this.loggedSubject.next(true);
          this.actionneurSubject.next(data.is_actionneur);
        })
      );
  }

  login(code: string): Observable<boolean> {
    const body = {
      code,
    };

    return this.http.post<any>(`${environment.apiURL}/auth/token`, body).pipe(
      map((data: any) => {
        this.getUser(data.token).subscribe();
        return false;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('actionneur');
    this.loggedSubject.next(false);
    this.actionneurSubject.next(false);
  }

  isLogged(): Observable<boolean> {
    return this.loggedSubject.asObservable().pipe(takeUntil(this.destroy$));
  }

  isActionneur(): Observable<boolean> {
    return this.actionneurSubject.asObservable().pipe(takeUntil(this.destroy$));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
