import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { HttpModule } from '@angular/http';
import {MessagesModule} from 'primeng/primeng';
import {MessageModule} from 'primeng/primeng';
import { SharedModule } from './shared/shared.module';
import { UserService } from './shared/services/user.service';
import { ApiService } from './shared/services/api.service';
import { JwtService } from './shared/services/jwt.service';
import { HomeService } from './shared/services/home.service';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { NoauthGuardService } from './shared/services/noauth-guard.service';
import { AlertService } from './shared/services/alert.service';
import {MessageService} from 'primeng/components/common/messageservice';

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NotificationComponent } from './shared/components/notification/notification.component';
import { AlertComponent } from './shared/components/alert/alert.component';
import { VerifyTokenComponent } from './/verify-token/verify-token.component';
import { HomeModule } from './home/home.module';
import { SigninComponent } from './signin/signin.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LandingComponent,
    ProfileComponent,
    NavbarComponent,
    FooterComponent,
    SigninComponent,
    VerifyTokenComponent,
    NotificationComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpModule,
    AppRoutingModule,
    HomeModule,
    SharedModule,
    MessagesModule,
    MessageModule
  ],
  providers: [
    UserService,
    ApiService, 
    JwtService, 
    HomeService, 
    AuthGuardService,
    NoauthGuardService,
    AlertService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
