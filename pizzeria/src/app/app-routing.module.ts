import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Bring in all your destination components
// The auth routes
import { LoginComponent } from 'src/app/screens/login/login.component';
import { RegistrationComponent } from 'src/app/screens/registration/registration.component';
import { ForgotPasswordComponent } from 'src/app/screens/forgot-password/forgot-password.component';

// Customer Routes
import { CustomerHomeComponent } from 'src/app/screens/customer-home/customer-home.component';
import { CustomerStoreComponent } from 'src/app/screens/customer-store/customer-store.component';
import { CartComponent } from 'src/app/screens/cart/cart.component';
import { CheckoutComponent } from 'src/app/screens/checkout/checkout.component';

// Admin Routes
import { AdminNavComponent } from 'src/app/screens/admin-nav/admin-nav.component';
import { AdminHomeComponent } from 'src/app/screens/admin-home/admin-home.component';
import { AdminOrdersComponent } from 'src/app/screens/admin-orders/admin-orders.component';
import { AddPizzaComponent } from 'src/app/screens/add-pizza/add-pizza.component';

const routes: Routes = [
  // The Login Component is the default route
  {path: '', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},

  // Customer Routes
  {path: '', component: CustomerHomeComponent, children:[
    {path: 'store', component:CustomerStoreComponent},
    {path: 'cart', component:CartComponent},
    {path: 'checkout', component:CheckoutComponent},
  ]},
  
  // Admin Routes
  {path: '', component:AdminNavComponent, children:[
    {path:'home', component:AdminHomeComponent},
    {path:'orders', component:AdminOrdersComponent},
    {path:'add-pizza', component:AddPizzaComponent},
    {path: 'order-details', component:CheckoutComponent},
  ]}

];

@NgModule({
  // Changed the default routing strategy(PathLocationStrategy) to HashLocationStrategy
  // Hopefully now the server will not return those pesky 404 errors...
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
