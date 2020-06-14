import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {BackendData} from "../models/BackendData";

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  constructor(private http:HttpClient) { }

  getPapers(id):Observable<any>{
    return this.http.get(BackendData.backendApiUrl+'p/g/'+id);
  }

  getTutes(id):Observable<any>{
    return this.http.get(BackendData.backendApiUrl+'t/g/'+id);
  }

  download(name):Observable<any>{
    return this.http.post(BackendData.backendApiUrl+'d',{
      fileName:name
    },{
      responseType:'blob' as 'json'
    });
  }
}
