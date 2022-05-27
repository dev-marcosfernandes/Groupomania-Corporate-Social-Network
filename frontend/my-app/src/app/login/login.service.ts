import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModeleLogin } from '../modele/login.modele';
import { Observable } from 'rxjs';



@Injectable({ providedIn: 'root' })
export class LoginService {
  get(id: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }

  rootURL="http://localhost:3000/";
 
  getAllUsers(){

return this.http.get('http://localhost:3000/api/auth/users');

  }

  loginUser(data: any):Observable<ModeleLogin>{
      
      return this.http.post<ModeleLogin>(this.rootURL+"api/auth/login",data)
  }

  }