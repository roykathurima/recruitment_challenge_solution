import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Import the Environment
import { environment } from 'src/environments/environment';


// The Order Shape
export interface Order {
  id: number,
  customer_name: string,
  gross_total: number,
  order_date: string,
  order_items: Array<OrderItem>
}

// The shape of the order Item
export interface OrderItem{
  quantity: number,
  pizza_name: string,
  unit_price: string,
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ) { }

  // Fetch all the orders -> For the Admin
  fetchOrders(): Promise<Array<Order>>{
    return new Promise((resolve, reject)=>{
      const url = this.apiUrl + "/get-orders/";
      this.http.get(url).toPromise()
      .then(orders=>resolve((orders as any).data as Array<Order>))
      .catch(err=>reject(err));
    })
  }

  // Fetch a single order given the ID
  fetchOrderWithId(id: number): Promise<Order>{
    return new Promise((resolve, reject)=>{
      const url = this.apiUrl + '/get-order/';
      this.http.post(url, {id}).toPromise()
      .then(order=>resolve((order as any).data as Order))
      .catch(err=>reject(err));
    })
  }
}
