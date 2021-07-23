import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

// Angular Material Stuff
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

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
  displayedColumns: string[] = ['customer_name', "order_date", "gross_total"];

  // Add pagination for easy access
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private oservice: OrderService,
    private dialog: MatDialog,
    private router: Router,
  ) { }
  ngAfterViewInit(): void {
    this.orders.paginator = this.paginator;
    this.orders.sort = this.sort;
  }

  ngOnInit(): void {
    this.isloading = true;
    this.oservice.fetchOrders()
    .then(orders=>{
      this.isloading = false;
      this.orders.data = orders;
    })
    .catch(err=>{
      this.isloading = false;
      this.dialog.open(ErrorMessageComponent, {width:'30%', data:{message:err.message?err.message:'Failed to fetch Orders'}});
    })
  }

  onRowClicked(row: Order){
    this.router.navigate(['order-details'], {state:{order_id:row.id, is_admin:true}});
  }
}
