import { Component, OnInit } from '@angular/core';

// Import the Auth Service
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  // Add the auth service as a provider for this component
  providers: [AuthService],
})
export class LoginComponent implements OnInit {

  constructor(
    // Inject the AuthService into the component
    private aservice: AuthService,
  ) { }

  ngOnInit(): void {
  }

  login(){}

}
