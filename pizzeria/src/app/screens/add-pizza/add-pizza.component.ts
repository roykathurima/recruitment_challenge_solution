import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

// Import the Pizza Service
import { PizzaService, Pizza } from 'src/app/services/pizza.service';

// Import the Error Component
import { ErrorMessageComponent } from 'src/app/components/error-message/error-message.component';

@Component({
  selector: 'app-add-pizza',
  templateUrl: './add-pizza.component.html',
  styleUrls: ['./add-pizza.component.css'],
  providers: [PizzaService],
})
export class AddPizzaComponent implements OnInit {
  name = '';
  price = '';
  show_delete = false;
  isloading = false;

  passed_pizza = {} as Pizza;

  constructor(
    private pservice: PizzaService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    // Should Check here if its an edit/delete so as to prepopulate the fields
    // and also either hide/show the delete 
    this.passed_pizza = history.state.pizza;
    if(this.passed_pizza){
      this.show_delete = true;
      this.name = this.passed_pizza.name;
      this.price = this.passed_pizza.price.toString();
    }else{
      this.show_delete = false;
    }
  }

  onSavePressed(){
    // Make sure that the fields are not Empty
    if(this.name == '' || this.price == ''){
      this.dialog.open(ErrorMessageComponent, {width:'20%', data:{message:'All Fields are Mandatory'}});
      return
    }

    // Make sure that the phone number is valid
    const price_format = /^\d+(\.\d+)?$/
    if(!this.price.match(price_format)){
      this.dialog.open(ErrorMessageComponent, {width:'20%', data:{message:'Price Shoild be a valid Number'}});
      return
    }
    
    // Add the Pizza
    this.isloading = true;
    this.pservice.addPizza(this.name, parseFloat(this.price))
    .then(rst=>{
      console.log(rst)
      // Kill the spinner, clear fields to allow for another insert and show success message
      this.isloading = false;
      this.name = '';
      this.price = '';
      // Should have just calles this a Message Component but that ship sailed
      this.dialog.open(ErrorMessageComponent, {width:'30%', data:{message:'Pizza successfully added to the store'}});
    })
    .catch(err=>{
      this.isloading = false;
      this.dialog.open(ErrorMessageComponent, {width:'20%', data:{message:'Failed to add the Pizza'}});
    })
  }
  
  onDeletePressed(){}

  onEditPressed(){}

}
