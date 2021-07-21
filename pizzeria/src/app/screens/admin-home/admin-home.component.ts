import { Component, OnInit } from '@angular/core';


interface Transaction {
  product: string;
  price: number;
}

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  isloading = false;

  constructor() { }

  ngOnInit(): void {
    // Fetch the Pizzas Right Here
    // Remember that there is a search feature...
  }

  displayedColumns: string[] = ['product', "price"];
  transactions: Transaction[] = [
    {product: 'Pepperoni Cheese Pizza', price: 4},
    {product: 'Beef Pizza', price: 5},
    {product: 'Chicken Pizza', price: 2},
    {product: 'Sunscreen', price: 4},
    {product: 'Berbecue Pizza', price: 25},
  ];
}
