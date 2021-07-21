import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { User, AuthService } from 'src/app/services/auth.service';
import { CartService, Cart } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cutomer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.css'],
  providers: [AuthService],
})
export class CustomerHomeComponent implements OnInit {
  user_name = '';
  cart_items  = new Observable<Cart>()
  constructor(
    private aservice: AuthService,
    private cservice: CartService,
  ) { }

  ngOnInit(): void {
    const user_info = JSON.parse(localStorage.getItem('user_info') as string) as User;
    this.user_name = user_info.name;

    // This updates the cart items counter
    this.cart_items = this.cservice.current_cart;
  }

  logout(){
    this.aservice.logout();
  }

}
