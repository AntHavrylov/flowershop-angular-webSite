import { CartService } from '../../services/cart/cart.service';
import { GetFlowersService } from '../../services/getFlowers/get-flowers.service';

import { flower } from './../../flower';

import { Component, OnInit } from '@angular/core';
import { trigger, transition, animate, style, state } from '@angular/animations';
import 'rxjs/add/operator/map';
import { UserService } from '../../services/user/user.service';
import { userTab } from '../../userTab';
import { tick } from '@angular/core/testing';
import { order } from '../../order';
//import * as $ from 'jquery';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition('void => *', [
        animate(1000, style({ opacity: 1 }))
      ])
    ])
  ]
})

export class HomeComponent implements OnInit {
  flowers: flower[];
  userOrderTab: order[];
  constructor(public flowerService: GetFlowersService, public cart: CartService, public userService: UserService) { }

  addToCart(flower: flower) {
    this.cart.setAmount(this.cart.getAmount() + 1);
    console.log("userOrderTab length: " + this.userOrderTab.length);
    let exist: boolean;
    let index: number = -1;
    for (let i = 0; i < this.userOrderTab.length; i++) {
      if (this.userOrderTab[i].productId == flower.id) {
        exist = true;
        index = i;
      }
    }
    if (exist) {
      this.cart.changeOrderAmount(this.userOrderTab[index].productId, (this.userOrderTab[index].productAmount + 1)).subscribe(
        data => { this.userOrderTab = <order[]>data }
      );
    } else {
      this.cart.addNewOrder(flower.id).subscribe(
        data => { this.userOrderTab = <order[]>data }
      );
    }
  }


  getDiff(item: flower) {
    let result: number = 1;
    if (this.userService.userId != null) {
      this.userOrderTab.forEach(element => {
        if (element.id == item.id) {
          result = item.amount - element.productAmount;
        }
      });
    }
    return result;
  }


  getAmItem(item:flower){
    let result:number = 0;
    this.userOrderTab.forEach(element => {
      if (element.id == item.id) {
        result = element.productAmount;
      }
    });
    return result;
  }


  remItem(flow: flower) {
    let item:order;
    this.userOrderTab.forEach(element => {
      if (element.id == flow.id) {
        item = element;
      }
    });

    if (this.getAmItem(flow) == 1) {
      this.cart.remOrder(item.productId).subscribe(
        dataS => {
          this.userOrderTab = <order[]>dataS
        }
      );
      this.cart.amount =this.cart.amount-1;
    } else if (this.getAmItem(flow)>1) {
      let newAmount = item.productAmount - 1;
      console.log(newAmount+"newAmount BITCH!!")
      this.cart.changeOrderAmount(item.productId, newAmount).subscribe(
        dataE => {
          this.userOrderTab = <order[]>dataE
          this.cart.amount = 0;
          this.userOrderTab.forEach(e => {
            this.cart.amount += e.productAmount;
          });
        }
      );
    }
  }

  ngOnInit() {
    this.flowerService.getFlowers().subscribe(data => {
      this.flowers = <flower[]>data
    });
    if (this.userService.userId != null) {
      this.cart.getUserTab().subscribe(data => {
        this.userOrderTab = <order[]>data
        let amount: number = 0;
        for (let i = 0; i < this.userOrderTab.length; i++) {
          amount += this.userOrderTab[i].productAmount
        }
        this.cart.setAmount(amount);
      });
    }


  }

}
