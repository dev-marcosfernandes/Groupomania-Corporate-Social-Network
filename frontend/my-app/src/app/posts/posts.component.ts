import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from './posts.service';
import { FormGroup, FormControl } from '@angular/forms';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';
import { Pipe } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private location: Location, private router: Router, private postsService: PostsService) { }

  post: any;
  titre: any;
  texte: any;
  post_id: any;
  postId: any;
  texte_comment: any;
  commentaire: any;
  user: any;
  id: any;
  prenom: any;
  nom: any;
  user_id: any;
  token: any;
  comment: any;
  idnumber: any;
  admin: any;
  imageUrl: any;
  time?: Date;
  photo: any;

  ngOnInit(): void {

    this.comment = new FormGroup({
      texte: new FormControl(),
      post_id: new FormControl()
    });

    let idnumber = this.route.snapshot.params['id'];
    this.comment.get('post_id').setValue(idnumber);

    this.getPosts();
    this.getComment();

  }

  postComment() {
    window.location.reload();
    this.id = JSON.parse(localStorage.getItem('id') || '{}');
    this.token = JSON.parse(localStorage.getItem('token') || '{}');
    console.warn(this.comment.value)
    this.postsService.createNewComment(this.comment.value, this.id, this.token).subscribe((result) => {
      console.warn("Nouveau commentaire créé", result)
    })
  };

  visibility() {
    this.admin = JSON.parse(localStorage.getItem('admin') || '{}');
    this.id = JSON.parse(localStorage.getItem('id') || '{}');
    if (this.admin == 0 && this.id !== this.user_id) {
      return false
    } else {
      return true
    }
  };

  getPosts() {
    this.route.paramMap
      .subscribe(params => {
        const id = params.get('id')
        this.postsService.getPostById(id).subscribe((posts) => {
          console.log(posts);

          this.user_id = posts.user_id
          this.titre = posts.titre
          this.texte = posts.texte
          this.imageUrl = posts.imageUrl
          this.time = posts.createdAt

          this.postsService.getUserById(this.user_id).subscribe((user) => {
            console.log(user.prenom)
            // this.id = user.id
            this.prenom = user.prenom
            this.nom = user.nom
            this.photo = user.photo
          });
        });
      });
  };

  getComment() {
    let id_c = this.route.snapshot.params['id']
    this.postsService.getAllComments(id_c).subscribe((commentaire) => {
      this.commentaire = commentaire;
    });
  };

  deletePostQuestion(){
    if(confirm("Êtes-vous sûr de vouloir supprimer cette publication ?")) {
      this.deleteP();
    }
  }

  deleteP() {
    this.id = this.route.snapshot.params['id']
    this.token = JSON.parse(localStorage.getItem('token') || '{}');
    this.postsService.deletePost(this.id, this.token).subscribe((result) => {
      console.warn(result);
      this.router.navigate(['/timeline'])
      .then(() => {
        window.location.reload();
      });
    });
  };

  faTrash = faTrash;
  faHome = faHome;

}
