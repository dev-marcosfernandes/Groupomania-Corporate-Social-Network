import { Component, OnInit } from '@angular/core';
import { faTools } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { TimelineService } from './timeline.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Publi } from './post.model';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-timeline-container',
  templateUrl: './timeline-container.component.html',
  styleUrls: ['./timeline-container.component.css'],
  providers: [DatePipe]
})

export class TimelineContainerComponent implements OnInit {

  userData: any;
  userAuteur: any;
  post: any;
  commentaire: any;
  id: number | undefined;
  token: any;
  objet: any;
  register: any;
  formData: any;
  admin: any;
  loading: boolean = false; 
  file: File = null as any; 

  myDate = new Date();

  constructor(private datePipe: DatePipe, private route: ActivatedRoute, private timelineService: TimelineService, private router: Router, public fb: FormBuilder,
    private http: HttpClient) {
      
    }

  API: string = "http://localhost:3000/";

  ngOnInit(): void {
    this.register = this.fb.group({
      titre: [''],
      texte: [''],
      imageUrl: [null]
    });

   this.datePipe.transform(this.myDate, 'yyyy-MM-dd');

    this.refreshPosts();

    this.timelineService.getAllUsers().subscribe((users) => {
      console.log(users);
      this.userData = users;
      
    });

  }

  visibility() {
    this.admin = JSON.parse(localStorage.getItem('admin') || '{}');
    if (this.admin == 1) {
      return false
    } else {
      return true
    }
  };

  visibilityModerator() {
    this.admin = JSON.parse(localStorage.getItem('admin') || '{}');
    if (this.admin == 0) {
      return false
    } else {
      return true
    }
  };

  refreshPosts() {
    this.timelineService.getAllPosts().subscribe((posts) => {
      this.post = posts;
    });
  }

  getID() {
    this.route.paramMap
      .subscribe(params => {
        console.log(params)
      });
  };

  onChange(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    console.log(file);
    this.register.patchValue({
      imageUrl: file,
    });
    this.register.get('imageUrl').updateValueAndValidity();
  };

  submit() {
    this.id = JSON.parse(localStorage.getItem('id') || '{}');
    this.token = JSON.parse(localStorage.getItem('token') || '{}');
  
    let post: Publi = ({ titre: this.register.get('titre').value, texte: this.register.get('texte').value })

    this.timelineService.createNewPost(post, this.id, this.token, this.register.get('imageUrl').value).subscribe((result) => {
      console.warn("Nouveau post créé", result)
      window.location.reload();
    });
  };

  logout() {
    localStorage.clear()
    this.router.navigate(['/'])
  };


  faTools = faTools;
  faTrash = faTrash;
  faKey = faKey;

}


