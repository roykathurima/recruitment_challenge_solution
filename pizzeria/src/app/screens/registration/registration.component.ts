import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  // Decided to use property binding for easier prototyping instead of forms
  email = '';
  full_name = '';
  phone_number = '';
  address = '';
  isloading = false;

  constructor() { }

  ngOnInit(): void {
  }

  createAccount(){
    // Add that sweet spinner over here
    console.log(`Email: ${this.email} \n Full Name: ${this.full_name}\nPhone Number: ${this.phone_number}\nAddress:${this.address}`)
  }

}
