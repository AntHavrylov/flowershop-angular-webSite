import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {NoopAnimationsModule} from '@angular/platform-browser/animations';

import { DataService } from './services/data/data.service';
import { CartService } from './services/cart/cart.service';
import { UserService } from './services/user/user.service';
import { GetFlowersService } from './services/getFlowers/get-flowers.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ItemInfoComponent } from './components/item-info/item-info.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BasketComponent } from './components/basket/basket.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { Http,HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserXhr } from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';


//import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
//import {MatCardModule} from 'npm install --save @angular/animations@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { filterInfo } from './components/item-info/filter-info';
import { flowerSearch } from './components/admin-page/flower-search';
import { userSearch } from './components/admin-page/user-search';
import { recordSearch } from './components/admin-page/record-search';



@NgModule({
  declarations: [
    AppComponent,
    BasketComponent,
    NavbarComponent,
    HomeComponent,
    ItemInfoComponent,
    NotFoundComponent,
    LoginComponent,
    SignUpComponent,
    AdminPageComponent,
    filterInfo,
    flowerSearch,
    userSearch,
    recordSearch,
    
],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      //main component
      {
        path: "",
        component: HomeComponent
      },
      {
        path: 'admin',
        component: AdminPageComponent
      },
      {
        path: 'Login',
        component: LoginComponent
      },
      {
        path: "signUp",
        component: SignUpComponent

      },
      {
        path: 'basket',
        component: BasketComponent
      },
      {
        path: 'inf',
        component: ItemInfoComponent
      },
      {
        path: '**',
        component: NotFoundComponent
      }
    ]),
    MatExpansionModule,
    MatFormFieldModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatInputModule,
    MatToolbarModule,
    NoopAnimationsModule,
    MatMenuModule,
    MatCardModule,
    MatGridListModule
    
  ],
  providers: [
    GetFlowersService,
    DataService,
    CartService,
    UserService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
