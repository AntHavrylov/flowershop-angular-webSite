import { Injectable } from '@angular/core';
import { flower } from '../../flower';
import { userTab } from '../../userTab';

@Injectable()
export class DataService {
  flowers: flower[];
  orders: flower[];
  userTable: userTab[];
  sum: number;
  amount: number;

  constructor() { }


  //add all flowers from store
  FillFlowerList(all: flower[]) {
    debugger
    for (let i = 0; i < all.length; i++) {
      this.flowers.push(all[i]);
    }
  }

  //add all records to user tab data
  FillUserTab(all: userTab[]) {
    debugger
    for (let i = 0; i < all.length; i++) {
      this.userTable.push(all[i]);
    }
  }

  //add all records to user orders list
  updateOrderList() {
    for (let i = 0; i < this.userTable.length; i++) {
      for (let j = 0; j < this.flowers.length; j++) {
        if (this.userTable[i].productId == this.flowers[j].id) {
          debugger
          this.orders.push(this.flowers[j]);
          this.amount += this.userTable[i].productAmount;
          this.sum += (this.userTable[i].productAmount * this.flowers[j].price);
        }
      }
    }
  }
}