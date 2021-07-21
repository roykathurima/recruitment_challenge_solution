import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Cart {
  items: Array<CartItem>,
  net_total: number,
}

export interface CartItem {
  pizza_id: number,
  quantity: number,
  unit_price: number,
  subtotal: number  
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // I don't think we need this number if we have a cart, we can always do cart.items.length
  // This will indicate the number of items in the cart.
  public items: number = 0;
  public cart = {} as Cart

  // This Service will be shared by any component reading or writing to cart
  // It will serve as a single source of truth
  // Since we want this as a singleton, we won't add it in the provider's array of the individual components' decorators
  public item_source = new BehaviorSubject(this.items);
  public current_items = this.item_source.asObservable();
  
  // We also require a shared representation of the cart between components
  public cart_source = new BehaviorSubject(this.cart);
  public current_cart = this.cart_source.asObservable();

  constructor() { }

  // Method to update the number of items in the cart
  updateItems(itemz: number){
    this.item_source.next(itemz);
  }

  // Method to update Cart
  updateCart(cart: Cart){
    this.cart_source.next(cart);
    // Consider adding the cart to localstorage to make the items persist during refreshes
  }
}
