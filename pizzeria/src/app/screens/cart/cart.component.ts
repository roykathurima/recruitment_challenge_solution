import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { CartService, Cart, CartItem } from 'src/app/services/cart.service';
import { Pizza } from 'src/app/services/pizza.service';


interface CartEntry {
  id: number,
  product: string;
  quantity: number,
  price: number;
}

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
  current_cart = {} as Cart;
  cart_entries: CartEntry[] = [];

  
  ngOnInit(): void {
    const pizzas = JSON.parse(localStorage.getItem('pizzas') as string) as Array<Pizza>;

    this.cservice.current_cart.subscribe(c_cart=>this.current_cart=c_cart);
    // map from items in the current cart to have a structure like that expected in the UI
    this.cservice.current_cart.pipe(
      map(cart=>{
        const retVal = [] as Array<CartEntry>
        cart.items.forEach(item=>{
          const entry = {
            product: pizzas.filter(e=>e.id == item.pizza_id)[0].name,
            quantity: item.quantity,
            price: item.subtotal,
            id:item.pizza_id
          } as CartEntry
          retVal.push(entry);
        })
        return retVal
      })
    ).subscribe(entries => this.cart_entries = entries);
  }

  async addQuantity(id: number){
    this.current_cart.items.forEach(e=>{
      if(e.pizza_id == id){
        e.quantity += 1; 
      }
    })
    this.cservice.updateCart(this.current_cart);
  }
  removeQuantity(id: number){
    this.current_cart.items.forEach(e=>{
      if(e.pizza_id == id){
        e.quantity -= 1; 
      }
    })
    // Remove any cart item having the quantity property of zero and below
    this.current_cart.items = this.current_cart.items.filter(el=>el.quantity>0);
    console.log('Cart after removal: ', this.current_cart)
    this.cservice.updateCart(this.current_cart);
  }
  
  checkOut(){}
  clearCart(){
    console.log("for Shizzle")
    this.cservice.updateCart({items:[] as Array<CartItem>} as Cart);
  }


  
  /** Gets the potential total cost of the transaction. */
  getTotalCost() {
    return this.cart_entries.map(t => t.price).reduce((acc, value) => acc + value, 0);
  }
}
