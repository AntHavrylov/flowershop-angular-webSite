import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  constructor(public cart:CartService,public userService:UserService,public router: Router) {

  }

  logOut(){
    this.userService.userName='';
    this.userService.userId=null;
    this.router.navigate(['Login']);
  }

  ngOnInit() {
  }

}
