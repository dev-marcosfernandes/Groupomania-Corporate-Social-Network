import { Component, OnInit } from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { ParametresService } from './parametres.service';
import { FormGroup, FormControl, FormBuilder,  Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parametres-container',
  templateUrl: './parametres-container.component.html',
  styleUrls: ['./parametres-container.component.css']
})
export class ParametresContainerComponent implements OnInit {

  register=new FormGroup({
    prenom: new FormControl('', Validators.required),
    nom: new FormControl(),
    email: new FormControl(),
    password: new FormControl()
  })

  item: any;
  id: any;
  token: any;
  admin: any;
  profil: any;
  prenom: any;
  nom: any;
  photo: any;

  constructor(private parametresService: ParametresService, private router:Router, private fb: FormBuilder) { }

  ngOnInit(): void {

   this.getID();

   this.adminLoggedIn();

   this.profil=this.fb.group({
   photo: [null]
  });

  this.id = JSON.parse(localStorage.getItem('id') || '{}');

  this.parametresService.getProjectById(this.id).subscribe((users) => 
  {
    console.log(users.prenom)

    this.prenom = users.prenom
    this.nom = users.nom
    this.photo = users.photo
  });
  }

  onChange(event: Event){
    const file = (event.target as HTMLInputElement).files![0];
    console.log(file);
    this.profil.patchValue({
      photo: file,
    });
    this.profil.get('photo').updateValueAndValidity();
  };

  profilSubmit(){
    this.id = JSON.parse(localStorage.getItem('id') || '{}')
    this.token = JSON.parse(localStorage.getItem('token') || '{}');
    this.parametresService.modifyPhoto(this.profil.get('photo').value, this.id, this.token).subscribe((result)=>{
      console.warn("Photo modifiée !", result)
    })
    if(this.profil.valid){
      window.location.reload();
    } 
  };

  collection(){
    this.id = JSON.parse(localStorage.getItem('id') || '{}')
    this.token = JSON.parse(localStorage.getItem('token') || '{}');
    this.parametresService.modifyUser(this.register.value, this.id, this.token).subscribe(()=>{
      console.warn("Profil modifié !");
      window.location.reload();
    });
  };

  deleteUserQuestion(){
    if(confirm("Êtes-vous sûr de vouloir supprimer votre compte ?")) {
      this.deleteUser();
    }
  }

  deleteUser(){
    this.id = JSON.parse(localStorage.getItem('id') || '{}')
    this.token = JSON.parse(localStorage.getItem('token') || '{}');
    this.parametresService.deleteUser(this.id, this.token).subscribe((result)=>{
        console.warn("result", result)
        localStorage.clear();
        this.router.navigate(['/'])
    }) 
  };

  getID(){
    let userGet = localStorage.getItem("user")
    console.log(userGet)
  };

  adminLoggedIn(){
    let val = localStorage.getItem('admin');
    if(val != null && val == "1"){
      this.router.navigate(['/timeline'])
    }
  };

  faHome = faHome;

}
