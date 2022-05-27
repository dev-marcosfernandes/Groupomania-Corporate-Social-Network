import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentsService } from './comments.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  constructor(private commentsService: CommentsService, private location: Location, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.getPosts()

  }

  id: any;
  id_c: any;
  user_id: any;
  texte: any;
  prenom: any;
  nom: any;
  commentaire: any;
  comment: any;
  post_id: any;
  token: any;
  userId: any;
  admin: any;
  photo: any;

  visibility() {

    this.admin = JSON.parse(localStorage.getItem('admin') || '{}');
    this.userId = JSON.parse(localStorage.getItem('id') || '{}');

    if (this.admin == 0 && this.userId !== this.user_id) {
      return false
    } else {
      return true
    }
  }

  deleteCommentQuestion(){
    if(confirm("Êtes-vous sûr de vouloir supprimer ce commentaire ?")) {
      this.deleteComment();
    }
  }

  deleteComment() {

    this.id_c = this.route.snapshot.params['id']
    this.token = JSON.parse(localStorage.getItem('token') || '{}');
    this.commentsService.deleteComment(this.id_c, this.token).subscribe((result) => {

      console.warn(result);

      this.location.back()
    });
  }

  getPosts() {

    this.post_id = this.route.snapshot.params['id']

    this.route.paramMap
      .subscribe(params => {
        const id = params.get('id')
        this.commentsService.getOneComment(id).subscribe((comment) => {
          console.log(comment);

          this.user_id = comment.user_id
          this.texte = comment.texte

          this.commentsService.getUserById(this.user_id).subscribe((user) => {
            console.log(user.prenom)

            this.id = user.id
            this.prenom = user.prenom
            this.nom = user.nom
            this.photo = user.photo
          })
        })
      });
  }

  faTrash = faTrash;

}
