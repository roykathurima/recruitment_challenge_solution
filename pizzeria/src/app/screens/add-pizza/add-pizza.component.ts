import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router,
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
    const inputs_valid = this.areInputsValid()
    if(inputs_valid == 'empty'){
      this.dialog.open(ErrorMessageComponent, {width:'20%', data:{message:'All Fields are Mandatory'}});
      return
    }

    // Make sure that the phone number is valid
    if(inputs_valid == 'invalid_phone'){
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
  
  onDeletePressed(){
    this.isloading = true;
    this.pservice.deletePizza(this.passed_pizza.id.toString())
    .then(rst=>{
      this.isloading = false;
      const dialaogRef = this.dialog.open(ErrorMessageComponent, {width:'20%', data:{message:'Pizza Deleted Successfully'}});
      // After a second, close the dialog and navigate to the home page
      setTimeout(()=>{
        dialaogRef.close();
        this.router.navigate(['home']);
      }, 1000);
    })
    .catch(err=>{
      this.isloading = false;
      this.dialog.open(ErrorMessageComponent, {width:'20%', data:{message:'Failed to Delete Pizza'}});
    })
  }

  onEditPressed(){
    const inputs_valid = this.areInputsValid();
    if(inputs_valid == 'empty'){
      this.dialog.open(ErrorMessageComponent, {width:'20%', data:{message:'All Fields are Mandatory'}});
      return
    }

    // Make sure that the phone number is valid
    if(inputs_valid == 'invalid_phone'){
      this.dialog.open(ErrorMessageComponent, {width:'20%', data:{message:'Price Shoild be a valid Number'}});
      return
    }
    
    // Edit the Pizza
    this.isloading = true;
    this.pservice.editPizza({id: this.passed_pizza.id, name:this.name, price: parseFloat(this.price)})
    .then(rst=>{
      this.isloading = false
      this.dialog.open(ErrorMessageComponent, {width:'20%', data:{message:'Pizza Updated Successfully'}});
    })
    .catch(err=>{
      this.isloading = false;
      this.dialog.open(ErrorMessageComponent, {width:'20%', data:{message:err.message?err.message:'Failed to update Pizza'}});
    });
  }

  // Crude input validation
  areInputsValid(): string{
    let retVal = 'valid';
    if(this.name == '' || this.price == '') {
      return 'empty';
    }
    const price_format = /^\d+(\.\d+)?$/
    if(!this.price.match(price_format)){
      return 'invalid_phone'
    }
    return retVal
  }

}
