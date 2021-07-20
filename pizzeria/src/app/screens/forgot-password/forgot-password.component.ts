import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { AuthService } from 'src/app/services/auth.service';

// The Error Message Component
import { ErrorMessageComponent } from 'src/app/components/error-message/error-message.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  providers: [AuthService]
})
export class ForgotPasswordComponent implements OnInit {

  email = ''
  isloading = false;

  constructor(
    private router: Router,
    private aservice: AuthService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  forgotPassword(){
    if(this.email == ""){
      this.dialog.open(ErrorMessageComponent, {width: '20%', data:{message:'Please provide an email to proceed'}});
      return;
    }

    // Check the formatting of the email
    const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(!this.email.match(mailformat) || this.email.length < 8){
      this.dialog.open(ErrorMessageComponent, {width: '20%', data:{message:'Please provide a proper email to proceed'}});
      return;
    }
    this.isloading = true;
    this.aservice.sendPasswordResetLink(this.email.toLowerCase().trim())
    .then(success=>{
      this.isloading = false;
      this.dialog.open(ErrorMessageComponent, {width:'40%', data:{message:'A Password Reset Link has been sent to your Email.\nCheck your Email, follow the instructions and attempt to login again'}});
      this.email = ''
    })
    .catch(err=>{
      this.isloading = false
      this.dialog.open(ErrorMessageComponent, {width:'40%', data:{message:err.message?err.message:'Failed to send the rese link. Try Again some other time'}});
    })
  }
}
