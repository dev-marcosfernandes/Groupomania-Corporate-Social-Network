import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) { }


  getOneComment(id: any| null): Observable<any> {

    return this.http.get(`http://localhost:3000/api/comment/find/${id}`);

  }

  getUserById(user_id: string | null): Observable<any>  {

    return this.http.get(`http://localhost:3000/api/auth/profil/${user_id}`)

  }

  deleteComment(id_c: any, token: any){
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    return this.http.delete(`http://localhost:3000/api/comment/del/${id_c}`, { headers: header })

  }

}
