import { Component, OnInit } from '@angular/core';

// Import the required services
import { OrderService, Order, OrderItem } from 'src/app/services/order.service';

interface OrderItemSummay{
  pizza_name: string,
  quantity: number,
  subtotal: number,
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers: [OrderService]
})
export class CheckoutComponent implements OnInit {

  show_delete = false;
  isloading = false;
  order = {} as Order

  constructor(
    private oservice: OrderService,
  ) { }

  ngOnInit(): void {
    const { order_id, is_admin } = history.state;
    if(is_admin) this.show_delete = true;
    this.isloading = true;
    console.log("the order ID: ", order_id);
    this.oservice.fetchOrderWithId(parseInt(order_id))
    .then(order_item=>{
      this.isloading = false;
      this.order = order_item
      console.log('the Items: ', order_item)
      this.order_items = order_item.order_items.map((item)=>{
        return {
          quantity: item.quantity,
          pizza_name: item.pizza_name,
          subtotal: (item.quantity * item.unit_price),
        }
      })
    })
    // Pull the order straight from the database...
    // Write an interface for the same...
  }
  displayedColumns: string[] = ['pizza_name', 'quantity', 'subtotal'];
  order_items: OrderItemSummay[] = [];

  onDeletePressed(){}

}
