import { Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';

import { User } from '../models/user.model';

@Injectable()
export class UserService {

  private currentUserSubject = new BehaviorSubject<any>({});
  public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private http: Http,
    private jwtService: JwtService
  ) { }

  populate() {
    if (this.jwtService.getToken()) {
      this.apiService.get('user/auth')
        .subscribe(
          data => {
            this.setAuth(data)
          },
          err => {
            this.purgeAuth()
          }
        );
    } else {
      this.purgeAuth();
    }
  }

  setAuth(data) {
    this.jwtService.saveToken(data.token);
    this.currentUserSubject.next(data.user);
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    this.jwtService.destroyToken();
    this.currentUserSubject.next(new User());
    this.isAuthenticatedSubject.next(false);
  }

  attemptAuth(credentials): Observable<any> {
    const route = 'user/auth'
    return this.apiService.post(route, credentials)
      .map(
      data => {
          if(data.user){
            this.setAuth(data);
            return data.user;
          }else{
            return data;
          }
      },
      err => {
        return err;
      }
      )
  }

  registerUser(details): Observable<any> {
    const route = 'user/save'
    return this.apiService.post(route, details)
      .map(
        data => {
          return data;
        }
      )
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

}
