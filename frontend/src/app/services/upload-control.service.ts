import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Grade} from "../models/Grade";
import {BackendData} from "../models/BackendData";
import {HttpClient} from "@angular/common/http";
import {Subject} from "../models/Subject";

@Injectable({
  providedIn: 'root'
})
export class UploadControlService {

  constructor(private http:HttpClient) { }

  getSubjects(id):Observable<Subject[]>{
    return this.http.get<Subject[]>(BackendData.backendApiUrl+'teach/getsubs/'+id);
  }

  getGrades(id):Observable<Grade[]>{
    return this.http.get<Grade[]>(BackendData.backendApiUrl+'teach/getgrades/'+id);
  }

  upload(formdata:FormData):Observable<any>{
    return this.http.post(BackendData.backendApiUrl+'paper',formdata);
  }

  getAllPapers(id):Observable<any>{
    return this.http.get(BackendData.backendApiUrl+'getp/'+id);
  }

  deletePaper(id):Observable<any>{
    return this.http.delete(BackendData.backendApiUrl+'paper/'+id);
  }


}
