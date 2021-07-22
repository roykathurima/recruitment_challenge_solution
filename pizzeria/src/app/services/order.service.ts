import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Import the Environment
import { environment } from 'src/environments/environment';


// The Order Shape as consumed by the UI
export interface Order {
  id: number,
  customer_name: string,
  gross_total: number,
  order_date: string,
  order_items: Array<OrderItem>
}

// The shape of the order Item as consumed by the UI
export interface OrderItem{
  quantity: number,
  pizza_name: string,
  unit_price: string,
}

// Order Shape as Consumed by the Backend
export interface OrderBackend{
  user_id: number,
  gross_total: number,
  order_date: string,
  order_items: Array<OrderItemBackend>,
}

// Order Item shape as consumed by the Backend
export interface OrderItemBackend{
  quantity: number,
  unit_price: number,
  subtotal: number,
  pizza_id: number
}

// We need to get the ID back after adding an order
// We create an interface for the shape of the object returned
export interface OrderAddReturnObject{
  row_count: number,
  action: string,
  order_id: number
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

  // Add Orders
  placeOrder(order: OrderBackend): Promise<OrderAddReturnObject>{
    return new Promise((resolve, reject)=>{
      const url = this.apiUrl + "/add-order/";
      this.http.post(url, {...order}).toPromise()
      .then(reply=>resolve((reply as any).data as OrderAddReturnObject))
      .catch(err=>reject(err));
    })
  }

  // Delete Orders -> Add a Delete on Cascade on the FK constraint to make the deletion painless
}
