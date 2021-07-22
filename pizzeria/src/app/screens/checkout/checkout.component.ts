import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

// Import the required services
import { OrderService, Order, OrderItem } from 'src/app/services/order.service';

// Import the Messagging component
import { ErrorMessageComponent } from 'src/app/components/error-message/error-message.component';

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
    private dialog: MatDialog,
    private router: Router,
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
    .catch(err=>{
      this.isloading = false;
      console.error("Failed to fetch the order: ", err);
      this.dialog.open(ErrorMessageComponent, {data:{message:err.message?err.message:"Failed to fetch the order"}})
    })
    // Pull the order straight from the database...
    // Write an interface for the same...
  }
  displayedColumns: string[] = ['pizza_name', 'quantity', 'subtotal'];
  order_items: OrderItemSummay[] = [];

  onDeletePressed(){
    this.isloading = true;
    this.oservice.deleteOrder(this.order.id)
    .then(rst=>{
      this.isloading = false;
      // consider navigating back to the list of orders
      // probably show the user that the order has been deleted successfully then navigate
      const dialaogRef = this.dialog.open(ErrorMessageComponent, {width:'20%', data:{message:'Order Deleted Successfully'}});
      // After a second, close the dialog and navigate to the home page
      setTimeout(()=>{
        dialaogRef.close();
        this.router.navigate(['orders']);
      }, 1000);
    })
    .catch(err=>{
      this.isloading = false;
      console.error("Error Deletion Failed: ", err);
      this.dialog.open(ErrorMessageComponent, {data:{message:err.message?err.message:"Failed to delete the order"}})
    })
  }

}
