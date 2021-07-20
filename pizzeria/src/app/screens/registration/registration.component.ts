import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { Router } from '@angular/router'

// Import the Location Service
import { AuthService, User } from 'src/app/services/auth.service';

// My Components
import { ErrorMessageComponent } from 'src/app/components/error-message/error-message.component';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [AuthService]
})
export class RegistrationComponent implements OnInit {

  // Decided to use two-way binding for easier prototyping instead of forms
  password = '';
  confirm_password = '';
  user = {} as User
  isloading = false;

  constructor(
    // Inject the dialog service
    private dialog: MatDialog,
    // Inject the Auth Service into the component
    private aservice: AuthService,
    // Help with navigation between screens
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  createAccount(){
    // Add that sweet spinner over here
    // console.log(`Email: ${this.email} \n Full Name: ${this.full_name}\nPhone Number: ${this.phone_number}\nAddress:${this.address}`)
    if(!this.user.email || !this.user.name || !this.user.phone_number || !this.user.address || this.password == "" || this.confirm_password == ""){
      this.dialog.open(ErrorMessageComponent, {width:'20%', data:{message: "All Fields are Mandatory"}});
      return;
    }
    
    // Check if the passwords match
    if(this.password != this.confirm_password){
      this.dialog.open(ErrorMessageComponent, {width:'20%', data:{message: "Make Sure that Your Passwords Match"}});
      return;
    }

    // Check if email if formatted properly
    const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(!this.user.email.match(mailformat) || this.user.email.length < 8){
      this.dialog.open(ErrorMessageComponent, {width: '20%', data:{message:'Please provide a valid Email to proceed'}});
      return;
    }

    // Check if the phone number is actually a number
    const phoneformat = /^\d+$/;
    if(!this.user.phone_number.match(phoneformat) || this.user.phone_number.length < 8){
      this.dialog.open(ErrorMessageComponent, {width: '20%', data:{message:'Please provide a valid Phone Number to proceed'}});
      return;
    }
    this.isloading = true
    this.user.is_admin = false;
    this.aservice.register(this.user, this.password)
    .then(result=>{
      console.log('the result', result);
      this.isloading = false;
      // Clear all the fields in the event the user presses back
      this.user = {} as User;
      this.password = '';
      this.confirm_password = '';

      //Navigate to the login page to allow the user to login
      this.router.navigateByUrl('');
    })
    .catch(e=>{
      this.user = {} as User;
      this.password = '';
      this.confirm_password = '';
      this.isloading = false;
      this.dialog.open(ErrorMessageComponent, {width:'20%', data:{message: e.message?e.message:'Could not Create you account. Try Again Later'}});
    })

  }

}
