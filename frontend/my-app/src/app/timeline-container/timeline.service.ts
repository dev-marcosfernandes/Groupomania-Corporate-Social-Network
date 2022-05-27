import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Publi } from './post.model';
import { HttpHeaders } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class TimelineService {

  constructor(private http: HttpClient) { }

  rootURL: string = "http://localhost:3000/";


  getAllUsers() {

    return this.http.get('http://localhost:3000/api/auth/users');

  };

  getAllPosts(): Observable<any> {

    return this.http.get('http://localhost:3000/api/posts/');
   
  };

  createNewPost(data: Publi, id: any, token: any, imageUrl: File): Observable<any> {
    const header = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
     const formData = new FormData();
      formData.append('post', JSON.stringify(data));
      formData.append('image', imageUrl);
    return this.http.post(`${this.rootURL}api/posts/${id}`, formData, { headers: header })
  };


  getUserById(id: string | null): Observable<any> {

    return this.http.get(`http://localhost:3000/api/auth/profil/${id}`)
  }
 
}



