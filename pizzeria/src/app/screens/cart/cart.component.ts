import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { CartService } from 'src/app/services/cart.service';
import { Pizza } from 'src/app/services/pizza.service';


interface CartEntry {
  product: string;
  quantity: number,
  price: number;
}

// This component only display the cart Items, Handles checkout and Clearing cart
// The in-cart buttons will handle the logistics of the individual items. You will only be passed the ID
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(
    private cservice: CartService,
  ) { }

  displayedColumns: string[] = ['product', 'quantity', "price"];
  cart_entries: CartEntry[] = [
    // {product: 'Pepperoni Cheese Pizza', quantity:1, price: 4},
    // {product: 'Beef Pizza', quantity:1, price: 5},
    // {product: 'Chicken Pizza', quantity:1, price: 2},
    // {product: 'Sunscreen', quantity:1, price: 4},
    // {product: 'Berbecue Pizza', quantity:1, price: 25},
  ];

  
  ngOnInit(): void {
    const pizzas = JSON.parse(localStorage.getItem('pizzas') as string) as Array<Pizza>;
    console.log('The sweet Pizzas: ', pizzas);
    this.cservice.current_cart.pipe(
      map(cart=>{
        const retVal = [] as Array<CartEntry>
        cart.items.forEach(item=>{
          const entry = {
            product: pizzas.filter(e=>e.id == item.pizza_id)[0].name,
            quantity: item.quantity,
            price: item.subtotal,
          } as CartEntry
          retVal.push(entry);
        })
        console.log('cart entries', retVal);
        return retVal
      })
    ).subscribe(entries => this.cart_entries = entries);
  }
  
  checkOut(){}
  clearCart(){}
  
  /** Gets the potential total cost of the transaction. */
  getTotalCost() {
    return this.cart_entries.map(t => t.price).reduce((acc, value) => acc + value, 0);
  }
}
