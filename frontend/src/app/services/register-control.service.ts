import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Subject} from "../models/Subject";
import {BackendData} from "../models/BackendData";
import {Teacher} from "../models/Teacher";
import {Grade} from "../models/Grade";

@Injectable({
  providedIn: 'root'
})
export class RegisterControlService {

  constructor(private http:HttpClient) { }

  getSubjects():Observable<Subject[]>{
    return this.http.get<Subject[]>(BackendData.backendApiUrl+'teach/getsubs');
  }

  getGrades():Observable<Grade[]>{
    return this.http.get<Grade[]>(BackendData.backendApiUrl+'teach/getgrades');
  }

  registerTecher(email,password,name,grades,subjects):Observable<any>{
    return this.http.post<any>(BackendData.backendApiUrl+'teach/register',{
      name:name,
      email:email,
      grades:grades,
      subjects:subjects,
      role_id:3 ,
      password:password

    })

  }
}
