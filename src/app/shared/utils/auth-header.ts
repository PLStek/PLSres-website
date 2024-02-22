import { HttpHeaders } from '@angular/common/http';

export function getAuthHeader(): HttpHeaders {
  const token = localStorage.getItem('token');
  let headers = new HttpHeaders();
  if (token) {
    return headers.set('Authorization', `Bearer ${token}`);
  } else {
    return headers;
  }
}
