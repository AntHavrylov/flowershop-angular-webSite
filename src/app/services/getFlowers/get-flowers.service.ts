import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { flower } from './../../flower';

@Injectable()
export class GetFlowersService {
  readonly RootUrl = 'http://localhost:51690/';

  constructor(private http: HttpClient) { }

  //get all flowers from base
  getFlowers() {
    return this.http.get(this.RootUrl + "api/getFlowers");
  }

  //get flower by name
  getFlower(nameFlower) {
    return this.http.get(this.RootUrl + "api/getFlower/" + nameFlower);
  }

  //change amount and update Flowers array on webApp      
  setAmount(nameFlower: string, amount: number) {
    return this.http.get(this.RootUrl + "api/setAmount/" + nameFlower + "/" + amount);
  }
}