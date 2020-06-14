import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TeacherRegisterComponent} from "./pages/teacher-register/teacher-register.component";
import {LoginComponent} from "./pages/login/login.component";
import {HomeComponent} from "./pages/home/home.component";
import {StudentRegisterComponent} from "./pages/student-register/student-register.component";
import {UploadsComponent} from "./pages/uploads/uploads.component";
import {ResultsComponent} from "./pages/results/results.component";


const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'teacher/r',
    component:TeacherRegisterComponent
  },
  {
    path:'student/r',
    component:StudentRegisterComponent
  },
  {
    path:'upload',
    component:UploadsComponent
  },
  {
    path:'p/:id',
    component:ResultsComponent
  },
  {
    path:'t/:id',
    component:ResultsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
