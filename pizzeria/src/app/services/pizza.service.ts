import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Import the environment
import { environment } from 'src/environments/environment';

// The shape of the Pizza
interface Pizza{
  name: string,
  price: number,
}

@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ) { }

  // Fetch All the Pizzas
  getPizzas(): Promise<Array<Pizza>>{
    return new Promise((resolve, reject)=>{
      const url = this.apiUrl + "/get-pizzas/";
      this.http.get(url).toPromise()
      .then(pizzas=>resolve(pizzas as Array<Pizza>))
      .catch(err=>reject(err));
    })
  }

  // Fetch a single Pizza by ID
  getPizza(id: string): Promise<Pizza>{
    return new Promise((resolve, reject)=>{
      const url = this.apiUrl + "/get-pizza/";
      this.http.post(url, {id}).toPromise()
      .then(pizza=>resolve(pizza as Pizza))
      .catch(err=>reject(err));
    });
  }

  // Delete a single Pizza
  deletePizza(id: string){
    return new Promise((resolve, reject)=>{
      const url = this.apiUrl + "/delete-pizza";
      // It is implemented as a POST request.
      // I wonder if it would have been better to use the HTTP DELETE verb
      this.http.post(url, {id}).toPromise()
      .then(rst=>resolve(rst))
      .catch(err=>reject(err));
    })
  }
}