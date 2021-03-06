import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'

// Import My Custom Services
import { PizzaService, Pizza } from 'src/app/services/pizza.service';

// The Error Dialog Component
import { ErrorMessageComponent } from 'src/app/components/error-message/error-message.component';

@Component({
  selector: 'app-customer-store',
  templateUrl: './customer-store.component.html',
  styleUrls: ['./customer-store.component.css'],
  providers: [PizzaService],
})
export class CustomerStoreComponent implements OnInit {
  
  pizzas = new Array<Pizza>();
  isloading = false;

  constructor(
    private pservice: PizzaService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.isloading = true;
    this.pservice.getPizzas()
    .then(pizzas=>{
      this.isloading = false
      this.pizzas = pizzas;
      // Lets Crudely store these here for the cart. :)
      localStorage.setItem('pizzas', JSON.stringify(pizzas));
    })
    .catch(err=>{
      this.isloading = false;
      this.dialog.open(ErrorMessageComponent, {width:'30%', data:{message:err.message?err.message:'Failed to get Your Pizzas'}});
    });
  }

}
