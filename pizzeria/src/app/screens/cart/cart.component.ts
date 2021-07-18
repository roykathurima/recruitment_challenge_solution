import { Component, OnInit } from '@angular/core';

interface Transaction {
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

  constructor() { }

  displayedColumns: string[] = ['product', 'quantity', "price"];
  transactions: Transaction[] = [
    {product: 'Pepperoni Cheese Pizza', quantity:1, price: 4},
    {product: 'Beef Pizza', quantity:1, price: 5},
    {product: 'Chicken Pizza', quantity:1, price: 2},
    {product: 'Sunscreen', quantity:1, price: 4},
    {product: 'Berbecue Pizza', quantity:1, price: 25},
  ];

  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.transactions.map(t => t.price).reduce((acc, value) => acc + value, 0);
  }

  ngOnInit(): void {
  }

}
