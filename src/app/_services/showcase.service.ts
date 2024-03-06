import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/showcase/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class ShowcaseService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(AUTH_API + "getAll");
  }
}