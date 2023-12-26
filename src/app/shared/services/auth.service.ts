import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    // Basic auth login
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    return this.http
      .post<any>('http://localhost/PLSres/api/login', formData)
      .subscribe((data: any) => {
        console.log(data.success);
      });
  }
}
