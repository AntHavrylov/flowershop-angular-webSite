import { Component, OnInit } from '@angular/core';

import { user } from '../../user';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  users: user;
  indexToAddUser: number = 0;
  userList: user[] = [];
  message="";

  loginIn = "";
  passwdIn = "";
  mailIn = "";

  constructor(private userService: UserService, public router: Router) { }

  //creation of new user
  createUser(userLogin: string, userPass: string, userMail: string) {
    let idU: number = this.indexToAddUser;
    let has: boolean = false;
    for (let i = 0; i < this.userList.length; i++) {
      if (userLogin == this.userList[i].login) {
        has = true;
      }
    }
    if (has != true) {
      this.userService.addUser(idU, userLogin, userPass, userMail).subscribe(data => {
        this.users = data;
        this.router.navigate(['Login']);
      });
      this.message="New accounte created successfully.";
    } else {
      console.log("allready exists this login")
      this.message="Allready exists this login in data base.";
    }
  }

  ngOnInit() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  //getting index to new user
  getId() {
    for (let i = 0; i < this.userList.length; i++) {
      if (this.indexToAddUser <= this.userList[i].id) {
        this.indexToAddUser = this.userList[i].id + 1;
      }
    }
  }

  //addition user to simple array
  addUserToList(item: user) {
    let has: boolean = false;
    for (let i = 0; i < this.userList.length; i++) {
      if (item.login == this.userList[i].login) {
        has = true;
      }
    }
    if (has == false) {
      this.userList.push(item);
      console.log("added: " + item.login);
      this.getId();
    }
  }



}
