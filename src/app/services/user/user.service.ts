import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { user } from '../../user';

@Injectable()
export class UserService {

  readonly RootUrl = 'http://localhost:51690/';
  userList:Observable<user>;
  
  userName:string = '';
  userId:number=null;

  constructor(private http: HttpClient) { 
    
  }
  /*
   *get list of users 
   */
  getUsers(){
    this.userList = this.http.get<user>(this.RootUrl+"api/getUsers");
    return this.userList;
  }

  getMaxId(){
    let maxID = this.http.get<number>(this.RootUrl+"api/getMaxId");
    console.log("maxId in service: "+maxID);
    return maxID;
  }


  getUserByName(name){
      this.userList = this.http.get<user>(this.RootUrl+"api/getUserByName/"+name);
    return this.userList;
  }

  /*
   *Add new user
   */
  addUser(userId:number, userLogin:string, userPass:string, userMail:string){
     this.userList = this.http.get<user>(this.RootUrl+"api/addUser/"+userId+"/"+userLogin+"/"+userPass+"/"+userMail);
    return this.userList;
  }

  /*
   *update user data
   */
  upUser(userId:number, userLogin:string, userPass:string, userMail:string){
    this.userList =this.http.get<user>(this.RootUrl+"api/upUser/"+userId+"/"+userLogin+"/"+userPass+"/"+userMail+"/");
    return this.userList;
  }

  /*
   *remove user
   */
  remUser(userId:number){
    this.userList = this.http.get<user>(this.RootUrl+"api/remUser/"+userId);
    return this.userList;
  }



}
