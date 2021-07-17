import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { environment } from 'src/environments/environment'

interface ReturnVal{
  error: string,
  message: string,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'pizzeria';
  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ){}

  async ngOnInit() {
    try{
      const msg = (await this.http.get(`${this.apiUrl}/angular_test/`).toPromise()) as ReturnVal;
      this.title = msg.message;
    }catch(e){
      console.error('Error during Initialization: ', e);
    }
  }
}
