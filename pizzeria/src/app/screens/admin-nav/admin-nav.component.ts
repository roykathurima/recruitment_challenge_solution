import { Component, OnInit } from '@angular/core';
import { AuthService, User } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css'],
  providers: [AuthService],
})
export class AdminNavComponent implements OnInit {
  user_name = ''

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
