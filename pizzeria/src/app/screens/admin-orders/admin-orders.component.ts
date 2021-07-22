import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

// Angular Material Stuff
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

// Import the Orders Service
import { Order, OrderService } from 'src/app/services/order.service';

// Import the Messaging Component
import { ErrorMessageComponent } from 'src/app/components/error-message/error-message.component';

interface Transaction {
  product: string;
  date: string;
}

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css'],
  providers: [OrderService]
})
export class AdminOrdersComponent implements OnInit, AfterViewInit {
  
  isloading = false;
  orders = new MatTableDataSource<Order>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private oservice: OrderService,
    private dialog: MatDialog,
  ) { }
  ngAfterViewInit(): void {
    this.orders.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.isloading = true;
    this.oservice.fetchOrders()
    .then(orders=>{
      this.isloading = false;
      this.orders.data = orders;
      console.log('the orders: ', orders);
    })
    .catch(err=>{
      this.isloading = false;
      this.dialog.open(ErrorMessageComponent, {width:'30%', data:{message:err.message?err.message:'Failed to fetch Orders'}});
    })
  }

  displayedColumns: string[] = ['customer_name', "order_date", "gross_total"];

}
