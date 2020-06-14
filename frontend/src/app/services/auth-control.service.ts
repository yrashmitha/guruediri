import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BackendData} from "../models/BackendData";
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class AuthControlService {

  public logged =new BehaviorSubject(this.isLoggedInUser());
  isLogged=this.logged.asObservable();



  constructor(private http:HttpClient) { }

  login(data:FormData):Observable<any>{
    return this.http.post(BackendData.backendApiUrl+'users/login',data);
  }

  getUser():User{
    return JSON.parse(localStorage.getItem('user'));
  }

  isLoggedInUser(){
    return !!localStorage.getItem('user');
  }

  changeLogState(state){
    this.logged.next(state)
  }
}
