import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login/login.service';


@Injectable({
  providedIn: 'root'
})
export class ExpenseGuard implements CanActivate {

    constructor(private loginService: LoginService, private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
      let url: string = state.url;

      return this.checkLogin(url);
  }

  checkLogin(url: string): boolean | UrlTree {
    console.log("Url: " + url)
    let val = localStorage.getItem('isUserLoggedIn');

    if(val != null && val == "true"){
       if(url == '/')
       this.router.parseUrl('/timeline');
       else 
          return true;
    } else return false
       return this.router.parseUrl('/');
       
    } 
 }


