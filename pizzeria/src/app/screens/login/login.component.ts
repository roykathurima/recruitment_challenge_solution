import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { Router } from '@angular/router'

// Import the Auth Service
import { AuthService } from 'src/app/services/auth.service';
import { ErrorMessageComponent } from 'src/app/components/error-message/error-message.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  // Add the auth service as a provider for this component
  providers: [AuthService],
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';
  isloading = false;

  constructor(
    // Inject the AuthService into the component
    private aservice: AuthService,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  login(){
    // Ensure that neither the password nor the email is empty
    if(this.email == "" || this.password == ""){
      this.dialog.open(ErrorMessageComponent, {width:'30%', data:{message: "Both the Email and Password are Required to LogIn"}});
      return;
    }
    // Ensure that the email is valid
    const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(!this.email.match(mailformat) || this.email.length < 8){
      this.dialog.open(ErrorMessageComponent, {width: '20%', data:{message:'Please provide a proper email to proceed'}});
      return;
    }
    this.isloading = true;
    this.aservice.login(this.email, this.password)
    .then(user=>{
      this.isloading = false;
      this.email = '';
      this.password = '';
      // Depending on the user's admin status, route them to the respective page
      if(user.is_admin){
        this.router.navigate(['home'])
      }else{
        this.router.navigate(['store'])
      }
    })
    .catch(err=>{
      this.email = '';
      this.password = '';
      this.isloading = false;
      this.dialog.open(ErrorMessageComponent, {width:'30%', data:{message:err.message?err.message:"Login Failed.\nTry Again Later"}});
    })
  }

}
