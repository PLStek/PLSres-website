import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    // Basic auth login
    const credentials = btoa(`${email}:${password}`);
    const headers = new HttpHeaders({
      Authorization: `Basic ${credentials}`,
    });
    console.log('Headers:', headers);
    return this.http
      .post('http://localhost/PLSres/api/login', {}, { headers })
      .subscribe((data: any) => {
        console.log(data.success);
      });
  }
}
