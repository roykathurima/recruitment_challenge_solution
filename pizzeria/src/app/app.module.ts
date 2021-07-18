import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './screens/login/login.component';
import { RegistrationComponent } from './screens/registration/registration.component';
import { ForgotPasswordComponent } from './screens/forgot-password/forgot-password.component';

// Angular Material
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';

// Pizziera Components
import { CustomerHomeComponent } from './screens/customer-home/customer-home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { PizzaCardComponent } from './components/pizza-card/pizza-card.component';
import { CustomerStoreComponent } from './screens/customer-store/customer-store.component';
import { CartComponent } from './screens/cart/cart.component';
import { AdminNavComponent } from './screens/admin-nav/admin-nav.component';
import { AdminHomeComponent } from './screens/admin-home/admin-home.component';
import { AdminOrdersComponent } from './screens/admin-orders/admin-orders.component';
import { AddPizzaComponent } from './screens/add-pizza/add-pizza.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    ForgotPasswordComponent,
    CustomerHomeComponent,
    NavbarComponent,
    SpinnerComponent,
    PizzaCardComponent,
    CustomerStoreComponent,
    CartComponent,
    AdminNavComponent,
    AdminHomeComponent,
    AdminOrdersComponent,
    AddPizzaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // Angular Material Imports
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
