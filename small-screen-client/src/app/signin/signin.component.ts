import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params} from '@angular/router';
import { Subscription }   from 'rxjs/Subscription';
import { FormGroup, FormControl, Validators ,AbstractControl} from "@angular/forms";
import { AlertService } from '../shared/services/alert.service';
import { UserService } from '../shared/services/user.service';
import { User } from '../shared/models/user.model';
import {MessageService} from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  test : Date = new Date();
  user: any;
  myForm: FormGroup;
  email:AbstractControl;
  password:AbstractControl;
  msgs = [];
  signinButton: String = "Sign In";

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userservice: UserService,
    private alertService: AlertService,
    private messageService: MessageService
  ) { }

  signin(){
    this.msgs = []
    this.signinButton = "loading..."
    const userDetails = {
        email : this.myForm.value.email,
        password:this.myForm.value.password
    } 
    this.userservice.attemptAuth(userDetails).subscribe(
      res => {
        this.msgs.push({severity:'success', summary:'', detail:res.message});
        this.signinButton = "Sign In"
        this.router.navigate([res.role])
      },
      err => {
        this.signinButton = "Sign In"        
        this.msgs.push({severity:'error', summary:'', detail:err.title});
      }
    )
  }


  ngOnInit() {
    
    this.myForm = new FormGroup({
      email: new FormControl(null, [
          Validators.required,
          Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      ]),
      password: new FormControl(null, Validators.compose([Validators.required,Validators.minLength(6)]))        
    });
    this.email = this.myForm.controls['email'];
    this.password = this.myForm.controls['password'];
  }

}
