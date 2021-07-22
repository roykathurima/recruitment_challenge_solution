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

  constructor(
    private pservice: PizzaService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    // Should Check here if its an edit/delete so as to prepopulate the fields
    // and also either hide/show the delete button
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

  }
  
  onDeletePressed(){}

}
