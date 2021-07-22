import { Component, OnInit } from '@angular/core';


interface Transaction {
  item: string;
  cost: number;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  show_delete = false;

  constructor() { }

  ngOnInit(): void {
    // Pull the order straight from the database...
    // Write an interface for the same...
  }
  displayedColumns: string[] = ['item', 'cost'];
  transactions: Transaction[] = [
    {item: 'Pepperoni Cheese Pizza', cost: 4},
    {item: 'Berbecue Steak Pizza', cost: 5},
    {item: 'Chicken Pizza', cost: 2},
  ];
  
    /** Gets the total cost of all transactions. */
    getTotalCost() {
      return this.transactions.map(t => t.cost).reduce((acc, value) => acc + value, 0);
    }

    onDeletePressed(){}

}
