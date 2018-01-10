import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params} from '@angular/router';
import { Subscription }   from 'rxjs/Subscription';
import { FormGroup, FormControl, Validators ,AbstractControl} from "@angular/forms";

import { UserService } from '../shared/services/user.service';
import { User } from '../shared/models/user.model';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    test : Date = new Date();
    user: User;
    myForm: FormGroup;
    email:AbstractControl;
    password:AbstractControl;
    role:AbstractControl;
    msgs = [];
    signupButton: String = "Sign Up";

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private userservice: UserService,
    ) { }

    signup(){
        this.msgs = []
        this.signupButton = "loading..."
        const userDetails = {
            email : this.myForm.value.email,
            password:this.myForm.value.password,
            role:this.myForm.value.role
        } 
        this.userservice.registerUser(userDetails).subscribe(
            res => {
                this.msgs.push({severity:'success', summary:'', detail:res.message});
                this.signupButton = "Sign Up"
                this.myForm.reset();                
            },
            err => {
                this.signupButton = "Sign Up"                
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
        role: new FormControl(null, Validators.required),
        password: new FormControl(null, Validators.compose([Validators.required,Validators.minLength(6)]))        
      });
      this.email = this.myForm.controls['email'];
      this.password = this.myForm.controls['password'];
      this.role = this.myForm.controls['role'];
    }
}
