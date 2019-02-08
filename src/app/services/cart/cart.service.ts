import { Injectable } from '@angular/core';
import { flower } from './../../flower';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user/user.service';

import { userTab } from '../../userTab';
import { GetFlowersService } from '../getFlowers/get-flowers.service';


@Injectable()
export class CartService {

  public amount: number = 0;
  
  readonly RootUrl = 'http://localhost:51690/';
  
  constructor(public http: HttpClient, public userService: UserService, public getFlowerService: GetFlowersService) { }

  //set amount value
  setAmount(newAmount:number){
    this.amount = newAmount;
  }
  //get amount value
  getAmount() {
    return this.amount;
  }
  
  //get user tab
  getUserTab() {
      return this.http.get(this.RootUrl + "api/getUserCart/" + this.userService.userId);
  }

  //add item to userTab 
  addNewOrder(prodOrder:number){
    return this.http.get<userTab[]>(this.RootUrl + "api/addCartProduct/" + this.userService.userId + "/" + prodOrder + "/" + 1);
  }

  //change amount in userTab 
  changeOrderAmount(prodId:number,prodAmount:number){
    console.log(this.RootUrl + "api/setCartProductAmount/" + this.userService.userId + "/" + prodId + "/" + prodAmount)
    return this.http.get<userTab[]>(this.RootUrl + "api/setCartProductAmount/" + this.userService.userId + "/" + prodId + "/" + prodAmount);
  }

  //remove item from userTab 
  remOrder(prodId:number){
    console.log(this.RootUrl + "api/removeCartItem/" + this.userService.userId + "/" + prodId)
    return this.http.get<userTab[]>(this.RootUrl + "api/removeCartItem/" + this.userService.userId + "/" + prodId);
  }

  //clear client cart
  emptyCart() {
    return this.http.get<userTab[]>(this.RootUrl + "api/clearUserCart/" + this.userService.userId);
  }

}