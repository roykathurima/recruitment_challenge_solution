import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// AngularFire Imports
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

// Angular Material Imports
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './screens/login/login.component';
import { RegistrationComponent } from './screens/registration/registration.component';
import { ForgotPasswordComponent } from './screens/forgot-password/forgot-password.component';


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

import { environment } from 'src/environments/environment';
import { ErrorMessageComponent } from './components/error-message/error-message.component'
import { CartService } from 'src/app/services/cart.service';
import { CheckoutComponent } from './screens/checkout/checkout.component';

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
    AddPizzaComponent,
    ErrorMessageComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    // Angular Material Imports
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  providers: [CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
