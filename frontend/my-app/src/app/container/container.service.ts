import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InscriptionService {

  constructor(private http: HttpClient) { }

  rootURL="http://localhost:3000/";
 
  getAllUsers(){

return this.http.get('http://localhost:3000/api/auth/users');

  }

  createNewUser(data: any){
      return this.http.post(this.rootURL+"api/auth/signup",data)
  }
  }