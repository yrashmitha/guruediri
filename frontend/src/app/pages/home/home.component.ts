import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HomepageService} from "../../services/homepage.service";
import {Grade} from "../../models/Grade";
import { NgxUiLoaderService } from 'ngx-ui-loader';

export interface Image {
  id:number;
  url:string
}



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})



export class HomeComponent implements OnInit {


  grades:Grade[];

  images:Image[]=[
    {id:1,url:"https://img.icons8.com/color/100/000000/1-circle-c--v1.png"},
    {id:2,url:"https://img.icons8.com/color/100/000000/2-circle-c--v1.png"},
    {id:3,url:"https://img.icons8.com/color/100/000000/3-circle-c--v1.png"},
    {id:4,url:"https://img.icons8.com/color/100/000000/4-circle-c--v1.png"},
    {id:5,url:"https://img.icons8.com/color/100/000000/5-circle-c--v1.png"},
    {id:6,url:"https://img.icons8.com/color/100/000000/6-circle-c--v1.png"},
    {id:7,url:"https://img.icons8.com/color/100/000000/7-circle-c--v1.png"},
    {id:8,url:"https://img.icons8.com/color/100/000000/8-circle-c--v1.png"},
    {id:9,url:"https://img.icons8.com/color/100/000000/9-circle-c--v1.png"},
    {id:10,url:"https://img.icons8.com/color/100/000000/10.png"},
    {id:11,url:"https://img.icons8.com/color/100/000000/11.png"},
    {id:12,url:"https://img.icons8.com/color/100/000000/12.png"},
    {id:13,url:"https://img.icons8.com/color/100/000000/13.png"},
  ];



  constructor(private router:Router,private homeService:HomepageService,private ngxService: NgxUiLoaderService) { }

  ngOnInit() {
    this.ngxService.start();
    this.homeService.getGrades().subscribe(res=>{
      console.log(res);
      this.grades=res;
      this.ngxService.stop();
    })
  }

  setImage(id):string{
    let url=null;
    let obj = this.images.find((o, i) => {
      if (o.id === id) {
        url= this.images[i].url; // stop searching
      }
    });
    return url;
  }

  paperClick(id,grade){
    this.router.navigate(['p/',id],{
      queryParams:{
        id:0,
        g:grade
      }
    })
  }

  tuteClick(id,grade){
    this.router.navigate(['t/',id],{
      queryParams:{
        id:1,
        g:grade
      }
    })
  }

}
