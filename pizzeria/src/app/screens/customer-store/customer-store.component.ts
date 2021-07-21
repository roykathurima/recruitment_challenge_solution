import { Component, OnInit } from '@angular/core';

// Import My Custom Services
import { CartService } from 'src/app/services/cart.service';
import { PizzaService } from 'src/app/services/pizza.service';

@Component({
  selector: 'app-customer-store',
  templateUrl: './customer-store.component.html',
  styleUrls: ['./customer-store.component.css'],
  providers: [PizzaService],
})
export class CustomerStoreComponent implements OnInit {
  num = 0

  constructor(
    private cservice: CartService,
    private pservice: PizzaService,
  ) { }

  ngOnInit(): void {
    this.pservice.getPizzas()
    .then(pizzas=>console.log("The Pizzas: ", pizzas))
    .catch(err=>console.error("Error Fetching Pizzas: ", err));
  }

  // PoC to show that you can change a variable in another component from here
  // updateCartCounter(){
  //   this.num = this.num+1;
  //   this.cservice.updateItems(this.num)
  // }

}
