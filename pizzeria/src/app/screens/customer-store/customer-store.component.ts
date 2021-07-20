import { Component, OnInit } from '@angular/core';

import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-customer-store',
  templateUrl: './customer-store.component.html',
  styleUrls: ['./customer-store.component.css'],
})
export class CustomerStoreComponent implements OnInit {
  num = 0

  constructor(
    private cservice: CartService,
  ) { }

  ngOnInit(): void {
  }

  // PoC to show that you can change a variable in another component from here
  // updateCartCounter(){
  //   this.num = this.num+1;
  //   this.cservice.updateItems(this.num)
  // }

}
