import { Component, OnInit } from '@angular/core';
import { InscriptionService } from './container.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {

  register = new FormGroup({
    prenom: new FormControl(),
    nom: new FormControl(),
    email: new FormControl(),
    password: new FormControl()
  })

  userData: any;

  get prenom() { return this.register.get('prenom'); }

  constructor(private inscriptionService: InscriptionService, private router: Router) { }


  isUserLoggedIn: boolean = false;

  ngOnInit(): void {

    this.inscriptionService.getAllUsers().subscribe((users) => {
      console.log(users);
    });

    this.loggedIn();

  }

  collection() {
      if(this.register.invalid){
        alert("Veuillez remplir tous les champs")
      } else{
    this.inscriptionService.createNewUser(this.register.value).subscribe(() => {
      console.log("Nouvel utilisateur créé")
    
     
        this.router.navigate(['/']);
      
    })}
  }

  loggedIn() {
    let val = localStorage.getItem('isUserLoggedIn');
    if (val != null && val == "true") {
      this.router.navigate(['/timeline'])
    }
  };

}
