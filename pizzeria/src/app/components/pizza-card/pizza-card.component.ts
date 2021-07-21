import { Component, OnInit, Input } from '@angular/core';

// My Imports
import { Pizza } from 'src/app/services/pizza.service';
import { CartService, Cart, CartItem } from 'src/app/services/cart.service';

@Component({
  selector: 'app-pizza-card',
  templateUrl: './pizza-card.component.html',
  styleUrls: ['./pizza-card.component.css']
})
export class PizzaCardComponent implements OnInit {

  // We pass the entire pizza to the component coz we need all the fields anyway
  @Input()
  pizza = {} as Pizza;
  current_cart = {} as Cart;

  // determine whether to show a single button or the counter
  one_button = true

  constructor(
    private cservice: CartService,
  ) { }

  ngOnInit(): void {
    // Get the current cart, if any
    this.cservice.current_cart.subscribe(cart=>this.current_cart = cart);
  }

  addToCart(){

    // set one button to false
    this.one_button = false
    // There might already be a cart, you should prolly check that first

    const cart_item: CartItem = {
      pizza_id: this.pizza.id,
      quantity: 1,
      unit_price: this.pizza.price,
      subtotal:this.pizza.price
    }
    // Add Item to cart
    if(!this.current_cart.items){
      // If there is nothing else in the cart
      const cart: Cart = {
        items: [cart_item],
        net_total: this.pizza.price,
      }
      this.cservice.updateCart(cart);
    }else{
      // If a cart already exists
      this.current_cart.items.push(cart_item);
      this.cservice.updateCart(this.current_cart);
    }
  }

  addQuantity(){
    // Means that we already have this item
  }

  removeQuantity(){}

}
