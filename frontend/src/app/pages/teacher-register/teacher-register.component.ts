import { Component, OnInit } from '@angular/core';
import {Subject} from "../../models/Subject";
import {RegisterControlService} from "../../services/register-control.service";
import {FormGroup} from "@angular/forms";
import {Grade} from "../../models/Grade";
import {Router} from "@angular/router";

@Component({
  selector: 'app-teacher-register',
  templateUrl: './teacher-register.component.html',
  styleUrls: ['./teacher-register.component.css']
})
export class TeacherRegisterComponent implements OnInit {

  name:string;
  email:string;
  password:string;
  gradesArray:Grade[]=[];
  selectedGrades:number[]=[];
  subjectArray:Subject[]=[];
  selectedSubjects:number[]=[];


  err:string;


  constructor(private registerService:RegisterControlService,private router:Router) { }

  ngOnInit() {
    this.registerService.getSubjects().subscribe(res=>{
      this.subjectArray=res;
      console.log()
    })

    this.registerService.getGrades().subscribe((res:Grade[])=>{
      this.gradesArray=res;
    })
  }

  onChanged(event){
    if (event.target.checked){
        this.selectedSubjects.push(event.target.attributes.id.nodeValue);
        console.log(this.selectedSubjects)
    }
    else {
      const index=this.selectedSubjects.indexOf(event.target.attributes.id.nodeValue,0);
      if (index!=-1){
        this.selectedSubjects.splice(index,1);
        console.log(this.selectedSubjects)

      }
    }
  }


  onChangedGrades(event){
    if (event.target.checked ==true){
      this.selectedGrades.push(event.target.value);
    }
    else if (event.target.checked == false) {
      const index=this.selectedGrades.indexOf(event.target.value,0);
      if (index!=-1){
        this.selectedGrades.splice(index,1);
      }
    }
  }

  onSubmit(){
    this.registerService.registerTecher(this.email,this.password,this.name,this.selectedGrades,this.selectedSubjects).subscribe(res=>{
      if (res.user){
        this.router.navigate(['login'])
      }
      else {
        console.log(res);
        this.err=res.msg
      }
    },err=>{
      console.log(err)
      this.err='Something went wrong!'

    })
  }
}
