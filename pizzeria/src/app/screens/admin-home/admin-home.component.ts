import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

// Get the Pizza Service Right Here
import { PizzaService, Pizza } from 'src/app/services/pizza.service';

// The Error Component
import { ErrorMessageComponent } from 'src/app/components/error-message/error-message.component';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
  providers: [PizzaService],
})
export class AdminHomeComponent implements OnInit {
  isloading = false;

  search_keyword = '';
  // For the Table
  displayedColumns: string[] = ['name', "price"];
  pizzas: Pizza[] = [];
  // A duplicate Array to restore pizzas after search mutations
  pizzas_cp: Pizza[] = [];

  constructor(
    private pservice: PizzaService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.isloading = true;
    // Fetch the Pizzas Right Here
    this.pservice.getPizzas()
    .then(pizza_array=>{
      this.isloading = false;
      this.pizzas = pizza_array
      this.pizzas_cp = pizza_array
    })
    .catch(err=>{
      this.isloading = false;
      this.dialog.open(ErrorMessageComponent, {data: {message:err.message?err.message:'Failed to fetch Pizzas'}})
    })
  }

  searchPizzas(){
    const keyword = this.search_keyword.trim().toLowerCase();
    if(keyword == ""){
      this.pizzas = this.pizzas_cp
    }else{
      this.pizzas = this.pizzas_cp.filter(pizza=>pizza.name.toLowerCase().trim().includes(keyword));
    }
  }
}
