import { CartService } from '../../services/cart/cart.service';

import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, animate, style, state } from '@angular/animations';
import 'rxjs/add/operator/map';
import { GetFlowersService } from '../../services/getFlowers/get-flowers.service';
import { UserService } from '../../services/user/user.service';
import { order } from '../../order';








@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',

  styleUrls: ['./basket.component.css'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      transition('void => *', [
        animate(1000, style({ opacity: 1 }))
      ]),
      transition('* => void', [
        animate(1000, style({ opacity: 0 }))
      ])
    ])
  ]
})

export class BasketComponent implements OnInit {
  amount: number;
  orders: order[];
  check: order[];
  sum: number = 0;
  checkSum:number;
  readonly RootUrl = 'http://localhost:51690/';

  constructor(public cart: CartService, public userService: UserService, public flowerService: GetFlowersService) { }
  ngOnInit() {
    this.uploadData();
  }

  //upload shoping cart of user
  uploadData() {
    this.cart.getUserTab().subscribe(datau => {
      this.orders = <order[]>datau
      this.cart.amount = 0;
      this.sum = 0;
      this.orders.forEach(e => {
        this.sum += e.productAmount * e.price;
        this.cart.amount += e.productAmount;
      });
    });
  }

  remItem(item: order) {
    if (item.productAmount == 1) {
      this.cart.remOrder(item.productId).subscribe(
        dataS => {
          this.orders = <order[]>dataS
          this.cart.amount = 0;
          this.sum = 0;
          this.orders.forEach(e => {
            this.sum += e.productAmount * e.price;
            this.cart.amount += e.productAmount;
          });
        }
      );
    } else if (item.productAmount > 1) {
      let newAmount = item.productAmount - 1;
      this.cart.changeOrderAmount(item.productId, newAmount).subscribe(
        dataE => {
          this.orders = <order[]>dataE
          this.cart.amount = 0;
          this.sum = 0;
          this.orders.forEach(e => {
            this.sum += e.productAmount * e.price;
            this.cart.amount += e.productAmount;
          });
        }
      );
    }
  }

  increaseAmount(item: order) {
    let newAmount = item.productAmount + 1;
    this.cart.changeOrderAmount(item.productId, newAmount).subscribe(
      dataE => {
        this.orders = <order[]>dataE
        this.cart.amount = 0;
        this.sum = 0;
        this.orders.forEach(e => {
          this.sum += e.productAmount * e.price;
          this.cart.amount += e.productAmount;
        });
      }
    );
  }


  // SET new amoun in dataBase and EMPTY choping cart of user
  buyItems() {
    this.check=this.orders;
    this.checkSum = this.sum;
    this.orders.forEach(e => {
      let newAmount = e.amount - e.productAmount;
      this.flowerService.setAmount(e.name, newAmount).subscribe();
    });
    this.cart.emptyCart().subscribe(
      dataEmp => {
        this.orders = <order[]>dataEmp
        this.cart.amount = 0
        this.sum = 0
      }
    );
  }
}

