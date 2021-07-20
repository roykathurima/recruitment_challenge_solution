import { Component, OnInit } from '@angular/core';

import { User, AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cutomer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.css'],
  providers: [AuthService],
})
export class CustomerHomeComponent implements OnInit {
  user_name = '';
  constructor(
    private aservice: AuthService,
  ) { }

  ngOnInit(): void {
    const user_info = JSON.parse(localStorage.getItem('user_info') as string) as User;
    this.user_name = user_info.name;
  }

  logout(){
    this.aservice.logout();
  }

}
