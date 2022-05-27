import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { HomeComponent } from './home/home.component';
import { ContainerComponent } from './container/container.component';
import { TimelineComponent } from './timeline/timeline.component';
import { TimelineHeaderComponent } from './timeline-header/timeline-header.component';
import { TimelineContainerComponent } from './timeline-container/timeline-container.component';
import { ParemetresComponent } from './paremetres/paremetres.component';
import { ParametresContainerComponent } from './parametres-container/parametres-container.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LogoutButtonComponent } from './logout-button/logout-button.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonLogoutComponent } from './button-logout/button-logout.component';
import { ProfilUserComponent } from './profil-user/profil-user.component';
import { PostsComponent } from './posts/posts.component';
import { CommentsComponent } from './comments/comments.component';
import { FooterComponent } from './footer/footer.component';








@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    InscriptionComponent,
    HomeComponent,
    ContainerComponent,
    TimelineComponent,
    TimelineHeaderComponent,
    TimelineContainerComponent,
    ParemetresComponent,
    ParametresContainerComponent,
    LogoutButtonComponent,
    ButtonLogoutComponent,
    ProfilUserComponent,
    PostsComponent,
    CommentsComponent,
    FooterComponent,
    
   

   
  
  

  
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
