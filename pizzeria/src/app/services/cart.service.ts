import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // This will indicate the number of items in the cart. 
  public items: number = 0

  // This Service will be shared by the any component reading or writing to cart
  // It will serve as a single source of truth
  // Since we want this as a singleton, we won't add it in the provider's array of the individual components' decorators
  public item_source = new BehaviorSubject(this.items);
  public current_items = this.item_source.asObservable();
  constructor() { }

  // Method to update the number of items in the cart
  updateItems(itemz: number){
    this.item_source.next(itemz);
  }
}
