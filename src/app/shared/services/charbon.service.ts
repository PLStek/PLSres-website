import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Charbon } from 'src/app/shared/models/charbon.model';

@Injectable({
  providedIn: 'root',
})
export class CharbonService {

  constructor(private http: HttpClient) {}

  getCharbonList(): Observable<Charbon[]> {
    return this.http.get<Charbon[]>('http://localhost:3000/charbon');
  }
}
