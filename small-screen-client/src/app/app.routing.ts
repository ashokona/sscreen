import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './shared/services/auth-guard.service';
import { NoauthGuardService } from './shared/services/noauth-guard.service';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
import { SigninComponent } from './signin/signin.component';
import { VerifyTokenComponent } from './/verify-token/verify-token.component';

const routes: Routes =[
    { path: 'home',             component: HomeComponent, canActivate:[NoauthGuardService] },
    { path: 'user-profile',     component: ProfileComponent },
    { path: 'signup',           component: SignupComponent , canActivate:[NoauthGuardService] },
    { path: 'signin',           component: SigninComponent , canActivate:[NoauthGuardService]},
    { path: 'landing',          component: LandingComponent },
    { path: 'nucleoicons',      component: NucleoiconsComponent },
    { path: 'verify/:token',      component: VerifyTokenComponent },
    { path: 'production', loadChildren:'./production-house/production-house.module#ProductionHouseModule', canActivate:[AuthGuardService] },
    { path: 'talent', loadChildren:'./showcase-talent/showcase-talent.module#ShowcaseTalentModule', canActivate:[AuthGuardService] },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    
  ],
})
export class AppRoutingModule { }
