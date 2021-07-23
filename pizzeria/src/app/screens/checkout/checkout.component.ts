import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

// Import the required services
import { OrderService, Order } from 'src/app/services/order.service';

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
  displayedColumns: string[] = ['pizza_name', 'subtotal'];
  order_items: OrderItemSummay[] = [];
  
  // To inform user if a discount was applied
  raw_order_total = 100;

  constructor(
    private oservice: OrderService,
    private dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.isloading = true;
    const { order_id, is_admin } = history.state;
    if(is_admin){
      this.show_delete = true;
      this.fetchTheOrder(parseInt(order_id))
    } else{
      // In the customer side, the order is fetched before the items are done being created
      // So I have added a 1 second delay as a workaround
      // Maybe I could have used a Client instead of a Pool to make the transactions synchronous 
      setTimeout(()=>{this.fetchTheOrder(parseInt(order_id))}, 1000);
    }
  }
  
  fetchTheOrder(order_id: number){
    this.oservice.fetchOrderWithId(order_id)
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
      this.raw_order_total = this.order_items.reduce((pVal, cVal)=>{return pVal+cVal.subtotal}, 0)
    })
    .catch(err=>{
      this.isloading = false;
      console.error("Failed to fetch the order: ", err);
      this.dialog.open(ErrorMessageComponent, {data:{message:err.message?err.message:"Failed to fetch the order"}})
    })
  }

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
