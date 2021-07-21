import { Component, OnInit, Input, OnDestroy, } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// My Imports
import { Pizza } from 'src/app/services/pizza.service';
import { CartService, Cart, CartItem } from 'src/app/services/cart.service';

@Component({
  selector: 'app-pizza-card',
  templateUrl: './pizza-card.component.html',
  styleUrls: ['./pizza-card.component.css'],
})
export class PizzaCardComponent implements OnInit, OnDestroy {

  // We pass the entire pizza to the component coz we need all the fields anyway
  @Input()
  pizza = {} as Pizza;
  current_cart = {} as Cart;
  
  //How many of these items are in the cart 
  in_cart = new Observable<number>();

  // determine whether to show a single button or the counter
  one_button = true

  constructor(
    private cservice: CartService,
  ) { }
  ngOnDestroy(): void {
    localStorage.setItem('cart_items', JSON.stringify(this.current_cart.items));
  }

  ngOnInit(): void {
    // Get the current cart, if any
    // Should also unsubscribe from these subscriptions....
    this.cservice.current_cart.subscribe(cart=>this.current_cart = cart);
    this.in_cart = this.cservice.current_cart.pipe(
      map(cart=>{
        const incart = cart.items.filter(item=>item.pizza_id == this.pizza.id)[0];
        return incart?incart.quantity:0
      }),
      );
      // A hack for restoring the Button's state
      const f = localStorage.getItem('cart_items');
      if(f){
        // Should consider adding user info as well so that you do not get somebody else's cart
        // But really that feels beyond the scope of the task
        const items = (JSON.parse(f as string) as Array<CartItem>)
        .filter(e=>e.pizza_id == this.pizza.id).length;
        items>0?this.one_button = false:this.one_button = true;
      }
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
    // Means that we already have this item, we are just incrementing the quantity
    this.current_cart.items.forEach(e=>{
      if(e.pizza_id == this.pizza.id){
        e.quantity += 1; 
      }
    })
    this.cservice.updateCart(this.current_cart);
  }
  
  removeQuantity(){
    // Means that we already have this item, we are just incrementing the quantity
    this.current_cart.items.forEach(e=>{
      if(e.pizza_id == this.pizza.id){
        if(e.quantity == 1){
          this.one_button = true;
        }
        e.quantity -= 1; 
      }
    })
    // Remove any cart item having the quantity property of zero and below
    this.current_cart.items = this.current_cart.items.filter(el=>el.quantity>0);
    this.cservice.updateCart(this.current_cart);
  }
  

}
