import { Component, OnInit } from '@angular/core';

import { AuthService, User } from 'src/app/services/auth.service';


interface Transaction {
  product: string;
  price: number;
}

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
  providers: [AuthService],
})
export class AdminHomeComponent implements OnInit {
  user_name = '';

  constructor(
    private aservice: AuthService,
  ) { }

  ngOnInit(): void {
    const user_info = JSON.parse(localStorage.getItem('user_info') as string) as User;
    this.user_name = user_info.name;
  }

  displayedColumns: string[] = ['product', "price"];
  transactions: Transaction[] = [
    {product: 'Pepperoni Cheese Pizza', price: 4},
    {product: 'Beef Pizza', price: 5},
    {product: 'Chicken Pizza', price: 2},
    {product: 'Sunscreen', price: 4},
    {product: 'Berbecue Pizza', price: 25},
  ];

  logout(){
    this.aservice.logout();
  }
}
