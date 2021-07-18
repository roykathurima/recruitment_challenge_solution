import { Component, OnInit } from '@angular/core';

interface Transaction {
  product: string;
  date: string;
}

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['product', "date"];
  transactions: Transaction[] = [
    {product: 'Pepperoni Cheese Pizza', date: '16 July 2021'},
    {product: 'Beef Pizza', date: '14 June 2021'},
    {product: 'Chicken Pizza', date: '16 Feb 2021'},
    {product: 'Sunscreen', date: '3 Aug 2021'},
    {product: 'Berbecue Pizza', date: '24 Dec 2021'},
  ];

}
