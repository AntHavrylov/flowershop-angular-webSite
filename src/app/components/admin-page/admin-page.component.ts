import { Component, OnInit, Input } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { UserService } from '../../services/user/user.service';
import { GetFlowersService } from '../../services/getFlowers/get-flowers.service';

import { flower } from '../../flower';
import { user } from '../../user';
import { userTab } from '../../userTab';
import { FilterPipe } from '../../filter.pipe';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  constructor(public flowerService: GetFlowersService, public userService: UserService, public http: HttpClient) { }

  readonly RootUrl = 'http://localhost:51690/';

  panelOpenState = false;
  searchFlowerTerm: string;
  searchUserTerm: string;
  searchRecordTerm: string;
  flowerData: flower[] = [];
  userData: user[] = [];
  userTabData: userTab[] = [];


  ngOnInit() {
    this.uploadData();
  }

  uploadData() {
    //get all products list
    this.http.get<flower[]>(this.RootUrl + "api/getFlowers").subscribe(data => {
      this.flowerData = data
    });

    //get all clients list
    this.http.get<user[]>(this.RootUrl + "api/getUsers").subscribe(data => {
      this.userData = data
    });
    //get all client carts
    this.http.get<userTab[]>(this.RootUrl + "api/getAllTable").subscribe(data => {
      this.userTabData = data
    });
  }

  //add new Flower
  flowerAdd(newName: string, newPrice: number, newAmount: number) {
    let Id = this.flowerData[this.flowerData.length - 1].id + 1;
    console.log("=> lastId = " + Id);
    console.log("=> addFlower: " + newName + "|" + newPrice + "|" + newAmount);
    this.http.get<flower[]>(this.RootUrl + "api/addFlower/" + Id + "/" + newName + "/" + newPrice + "/" + newAmount).subscribe(
      data => {
        this.flowerData = data
      }
    );
  }

  //edit data in FlowerBase
  flowerEdit(item: flower, newP: number, newA: number) {
    let newPrice: number = item.price;
    let newAmount: number = item.amount;
    if (newP > 0) { newPrice = newP }
    if (newA > 0) { newAmount = newA }
    this.http.get<flower[]>(this.RootUrl + "api/setPrice_Amount/" + item.name + '/' + newPrice + '/' + newAmount).subscribe(
      data => {
        this.flowerData = data
      }
    );
  }

  //rem flower api/remFlower/{nameF}
  flowerRemove(item: flower) {
    this.http.get<flower[]>(this.RootUrl + "api/remFlower/" + item.name).subscribe(
      data => { this.flowerData = data }
    );
  }

  //add new user
  userAdd(name2user: string, password: string, mail: string) {
    let Id = this.userData[this.userData.length - 1].id + 1;
    this.http.get<user[]>(this.RootUrl + "api/addUser/" + Id + "/" + name2user + "/" + password + "/" + mail).subscribe(
      data => { this.userData = data });
  }

  //edit data in userBase
  userEdit(user2edit: user, new2Name: string, new2Password: string, new2Mail: string) {
    let newName = new2Name;
    let newPassword = new2Password;
    let newMail = new2Mail;
    if (user2edit.id != 0) {
      if (newName.trim() == "") {
        newName = user2edit.login;
      }
    }
    if (newPassword.trim() == "") {
      newPassword = user2edit.password;
    }
    if (newMail.trim() == "") {
      newMail = user2edit.mail;
    }
    console.log(this.RootUrl + "api/upUser/" + user2edit.id + "/" + newName + "/" + newPassword + "/" + newMail);
    this.http.get<user[]>(this.RootUrl + "api/upUser/" + user2edit.id + "/" + newName + "/" + newPassword + "/" + newMail).subscribe(
      data => { this.userData = data }
    );

  }

  //remove user
  userRemove(user: user) {
    this.http.get<userTab[]>(this.RootUrl + "api/deleteUser_clearCart/" + user.id).subscribe(
      data => { this.userTabData = data });
    this.http.get<user[]>(this.RootUrl + "api/remUser/" + user.id).subscribe(
      data => { this.userData = data });
  }


  tabAdd(userId: number, productId: number, newProdAmount: number) {
    let userExist: boolean = false;
    let productExist: boolean = false;
    let alreadyExist: boolean = false;
    let maxAmount: number;
    for (let i = 0; i < this.userData.length; i++) {
      if (this.userData[i].id == userId) {
        userExist = true;
      }
    }
    for (let i = 0; i < this.flowerData.length; i++) {
      if (this.flowerData[i].id == productId) {
        productExist = true;
        maxAmount = this.flowerData[i].amount;
      }
    }
    for (let i = 0; i < this.userTabData.length; i++) {
      if ((this.userTabData[i].clientId == userId) && (this.userTabData[i].productId == productId)) {
        alreadyExist = true;
      }
    }

    if (userExist && productExist && (newProdAmount > 0) && (newProdAmount <= maxAmount) && !alreadyExist) {
      this.http.get<userTab[]>(this.RootUrl + "api/adminAddCartProduct/" + userId + "/" + productId + "/" + newProdAmount).subscribe(
        data => { this.userTabData = data }
      );
    } else {
      alert("Entered wrong values");
    }
  }
  //edit user basket record
  tabEdit(tab: userTab, new2ProdAmount: number) {
    let maxAmount: number;
    for (let i = 0; i < this.flowerData.length; i++) {
      if (this.flowerData[i].id == tab.productId) {
        maxAmount = this.flowerData[i].amount;
      }
    }
    if (new2ProdAmount > 0 && new2ProdAmount <= maxAmount) {
      this.http.get<userTab[]>(this.RootUrl + "api/AdminSetCartProductAmount/" + tab.clientId + "/" + tab.productId + "/" + new2ProdAmount).subscribe(
        data => { this.userTabData = data }
      );
    } else {
      alert("Entered wrong values");
    }


  }

  //api/removeCartItem/{clietnId}/{productId}
  tabRemove(tab: userTab) {
    //console.log(this.RootUrl + "api/AdminRemoveCartItem/" + tab.clientId + "/" + tab.productId);
    this.http.get<userTab[]>(this.RootUrl + "api/AdminRemoveCartItem/" + tab.clientId + "/" + tab.productId).subscribe(
      data => { this.userTabData = data }
    );
  }
}

