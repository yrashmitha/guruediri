import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BackendData} from "../models/BackendData";

@Injectable({
  providedIn: 'root'
})
export class HomepageService {

  constructor(private http:HttpClient) { }

  getGrades():Observable<any>{
    return this.http.get(BackendData.backendApiUrl+'h/grades');
  }
}
