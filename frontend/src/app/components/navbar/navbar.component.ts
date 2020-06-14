import { Component, OnInit } from '@angular/core';
import {AuthControlService} from "../../services/auth-control.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  logged;
  constructor(private auth:AuthControlService,private router:Router) { }

  ngOnInit() {
    this.auth.isLogged.subscribe(res=>{
      this.logged=res;
      console.log(res)
    })
  }


  onLogout(){
    console.log('out')
    localStorage.clear();
    this.auth.changeLogState(false);
    this.router.navigate(['/'])
  }

}
