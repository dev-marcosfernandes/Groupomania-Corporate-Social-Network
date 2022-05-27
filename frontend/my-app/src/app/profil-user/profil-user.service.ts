import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfilUserService {
 
  rootURL="http://localhost:3000/";

  constructor(private http: HttpClient) { }

  getUserById(id: string | null): Observable<any> {

    return this.http.get(`http://localhost:3000/api/auth/profil/${id}`)

  };

  getAllPosts(post_id: any) {

    return this.http.get(`http://localhost:3000/api/posts/user/${post_id}`);
  
  };

  deleteUser(id: any, token: any): Observable<any> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.delete(`${this.rootURL}api/auth/${id}/del`, { headers: header })
  };
}




