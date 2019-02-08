import { Component, OnInit } from '@angular/core';

import { user } from '../../user';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  panelOpenState: boolean = false;
  message: string = "";
  users: user;
  client: user;

  logInput = "";
  passInput = "";

  constructor(private userService: UserService,public router: Router) { }


  ngOnInit() {

  }


  enterUser(name: string, password: string) {

    this.userService.getUserByName(name).subscribe(data => {
      this.client = data;
      
      if (this.client[0] == null) {
        this.message = "Entered wrong name";
      } else if ((this.client[0].login == name) && !(this.client[0].password == password)) {
        this.message = "Entered password is Incorrect";
      }else {
        this.message = "Autorization done";
        //this.userService.userOnline = this.client[0];
        this.userService.userName = this.client[0].login;
        this.userService.userId = this.client[0].id;
        this.router.navigate(['']);
      } 
    });


  }

}
