import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }

 rootURL: string= 'http://localhost:3000/api';
 

login(data: any): Observable<any> {
  return this.http.post(`${this.rootURL}/auth/login`, data)
}

}
