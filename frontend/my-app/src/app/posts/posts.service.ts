import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class PostsService {
 
  constructor(private http: HttpClient) { }

  getPostById(id: string | null): Observable<any> {

    return this.http.get(`http://localhost:3000/api/posts/${id}`)

  };

  createNewComment(data: any, id: any, token: any): Observable<any>{
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`http://localhost:3000/api/comment/${id}`, data, { headers: header })

  };

  getUserById(user_id: string | null): Observable<any>  {

    return this.http.get(`http://localhost:3000/api/auth/profil/${user_id}`)

  };

  getAllComments(id_c: any): Observable<any> {

    return this.http.get(`http://localhost:3000/api/comment/${id_c}`);

  };

  deletePost(id: any, token: any): Observable<any> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete(`http://localhost:3000/api/posts/delete/${id}`, { headers: header })

  };

}