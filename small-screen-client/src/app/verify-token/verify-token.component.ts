import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import { HomeService } from '../shared/services/home.service';

@Component({
  selector: 'app-verify-token',
  templateUrl: './verify-token.component.html',
  styleUrls: ['./verify-token.component.css']
})
export class VerifyTokenComponent implements OnInit {
  token: String;
  toverify: String;
  msgs = [];
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private homeService : HomeService
  ) {}

  verify(){
    if(this.toverify === "email" && this.token != ''){
      this.homeService.verifyEmail(this.token).subscribe(
        res => {
          console.log(res)
          this.msgs.push({severity:'success', summary:'', detail:res.message});
          
        },
        err => {
          this.msgs.push({severity:'error', summary:'', detail:err.title});                
          
        }
      )
    }
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.token = params['token'];
    });
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.toverify = params['toverify'];
    });
    this.verify()
  }

}
