import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfilUserService } from './profil-user.service';


@Component({
  selector: 'app-profil-user',
  templateUrl: './profil-user.component.html',
  styleUrls: ['./profil-user.component.css']
})
export class ProfilUserComponent implements OnInit {
  user: any;
  id: any;
  prenom: any;
  nom: any;
  email: any;
  post: any;
  post_id: any;
  token: any;
  admin: any;
  photo: any;

  constructor(private route: ActivatedRoute, private router: Router, private profilUserService: ProfilUserService) {}

  ngOnInit(): void {

    this.getPosts();

    this.route.paramMap
    .subscribe(params => {
      let id = params.get('id')
      this.profilUserService.getUserById(id).subscribe((users) => 
      {
        console.log(users)

        this.prenom = users.prenom
        this.nom = users.nom
        this.email = users.email
        this.photo = users.photo
      });
      });
  };

  visibility(){

    this.admin = JSON.parse(localStorage.getItem('admin') || '{}');
    this.id = this.route.snapshot.params['id'];
    if (this.admin == 0) {
      return false
    } else{
      return true
    }
  };

  deleteUserQuestion(){
    if(confirm("Êtes-vous sûr de vouloir supprimer ce compte ?")) {
      this.deleteUser();
    }
  }

  deleteUser(){
    this.id = this.route.snapshot.params['id']
    this.token = JSON.parse(localStorage.getItem('token') || '{}');
    this.profilUserService.deleteUser(this.id, this.token).subscribe((result)=>{
        console.warn("result", result)
        this.router.navigate(['/timeline'])
    });
  };

   getPosts(){
    this.post_id=this.route.snapshot.params['id']
    this.profilUserService.getAllPosts(this.post_id).subscribe((post) => 
    {
      console.log(post);
      this.post = post;
    });
   };
}

  
