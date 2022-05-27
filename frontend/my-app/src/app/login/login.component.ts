import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JsonpClientBackend } from '@angular/common/http';
import { asLiteral } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  register = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private loginService: LoginService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.loggedIn();

  }

  isUserLoggedIn: boolean = false;
  user: any;
  local!: string;
  result: any;
  user_id: any;
  token: any;
  admin: any;

  loggedIn() {
    let val = localStorage.getItem('isUserLoggedIn');
    if (val != null && val == "true") {
      this.router.navigate(['/timeline'])
    }
  };

  onClick() {
    if (this.register.invalid) {
      alert("Email ou mot de passe incorrect")
    } else {
      this.loginService.loginUser(this.register.value).subscribe((result) => {
        console.warn(result)

        this.user_id = result.id
        this.token = result.token
        this.admin = result.admin

        localStorage.setItem('id', JSON.stringify(this.user_id))
        localStorage.setItem('token', JSON.stringify(this.token))
        localStorage.setItem('admin', JSON.stringify(this.admin))

        // if(!this.register){
        //   console.log("erreur")
        // } else
        if (this.register.valid) {
          this.isUserLoggedIn = true;
          localStorage.setItem('isUserLoggedIn', this.isUserLoggedIn ? "true" : "false");
          this.router.navigate(['/timeline'])
        }
      });
    }
  };


}



