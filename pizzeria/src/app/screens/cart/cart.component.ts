import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { MatDialog } from '@angular/material/dialog';

// Import my services
import { CartService, Cart, CartItem } from 'src/app/services/cart.service';
import { Pizza } from 'src/app/services/pizza.service';
import { User } from 'src/app/services/auth.service';
import { OrderService, OrderBackend, OrderItemBackend } from 'src/app/services/order.service';

// Import the Error Component
import { ErrorMessageComponent } from 'src/app/components/error-message/error-message.component';


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
    private router: Router,
    private oservice: OrderService,
    private dialog: MatDialog,
  ) { }

  displayedColumns: string[] = ['product', 'quantity', "price"];
  current_cart = {} as Cart;
  cart_entries: CartEntry[] = [];

  isloading = false;
  
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
            price: item.unit_price,
            id:item.pizza_id,
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
    this.cservice.updateCart(this.current_cart);
  }
  
  checkOut(){
    // Commit the changes to the database
    // After the promise resolves, clear the cart and Navigate to the checkout route
    this.isloading = true;
    const user = JSON.parse(localStorage.getItem('user_info') as string) as User;
    const order_items: Array<OrderItemBackend> = [];
    this.current_cart.items.forEach(item=>{
      const order_item: OrderItemBackend = {
        quantity: item.quantity,
        subtotal: item.quantity * item.unit_price,
        unit_price: item.unit_price,
        pizza_id: item.pizza_id,
      }
      order_items.push(order_item);
    })
    const the_order: OrderBackend = {
      user_id: parseInt(user.id),
      // Sum up all the subtotals and pass them to the Obtain discount value to get the final discounted value
      gross_total: this.obtainDiscount(order_items.reduce((pVal, cVal)=>{return pVal+cVal.subtotal},0)),
      order_date: (new Date()).toISOString(),
      order_items,
    }
    // console.log("the order: ", the_order);
    // return;
    this.oservice.placeOrder(the_order)
    .then(result=>{
      this.isloading = false;
      // console.log("The Result: ", result);
      this.clearCart();
      this.router.navigate(['checkout'], {state:{order_id:result.order_id, is_admin:false}});
    })
    .catch(err=>{
      this.isloading = false;
      this.dialog.open(ErrorMessageComponent, {data:{message:err.message?err.message:"An Error occured while placing the order"}})
    })
  }
  clearCart(){
    this.cservice.updateCart({items:[] as Array<CartItem>} as Cart);
  }


  // Calculate discount price
  obtainDiscount(amount: number): number{
    let retVal = amount;
    // If the amount is between 50 and 100 exclusive, the goods will be 5% off
    if(amount > 50 && amount < 100){
      retVal = 0.95 * amount;
      // if the amount is $100 and above, they will get a 10% off
    }else if(amount >= 100){
      retVal = 0.9 * amount;
    }
    return retVal;
  }
  
  /* Gets the potential total cost of the transaction. */
  getTotalCost() {
    return this.cart_entries.map(t => t.price * t.quantity).reduce((acc, value) => acc + value, 0);
  }
}
