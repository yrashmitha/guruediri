import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthControlService} from "../../services/auth-control.service";
import {User} from "../../models/User";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  user:User;
  constructor(private auth:AuthControlService,private router:Router) { }

  ngOnInit() {
    this.loginForm=new FormGroup({
      email:new FormControl(null,[Validators.email,Validators.required]),
      password:new FormControl(null,[Validators.required])
    })
  }

  onLogin(){
    let formdata=new FormData();
    formdata.append('email',this.loginForm.value.email);
    formdata.append('password',this.loginForm.value.password);
    this.auth.login(formdata).subscribe(res=>{
      console.log(res);
      this.user=res.user;
      if (res.user){
        localStorage.setItem('user',JSON.stringify(this.user));
        this.auth.changeLogState(true);
        this.router.navigate(['upload'])
      }

    })
  }
}
