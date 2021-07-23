import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, } from '@angular/router'

import { User } from 'src/app/services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(
    private router: Router,
  ) { }
  // Can we activate this route: return true if Yes, otherwise no
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // We can only activate this Route if we are logged in
    if(!localStorage.getItem('user_info')){
      this.router.navigate([''])
      return false
    }else{
      return true
    }
  }
  // can we access the children of this route
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
    // We can only activate the children of the Route if we are logged in
    if(!localStorage.getItem('user_info')){
      this.router.navigate([''])
      return false
    }else{
      return true
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate, CanActivateChild {

  constructor(
    private router: Router,
  ) { }
  // Can we activate this route: return true if Yes, otherwise no
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // The user must not only logged but also be an admin in order to access this route
    if(!localStorage.getItem('user_info')){
      this.router.navigate([''])
      return false
    }else{
      const is_admin = (JSON.parse(localStorage.getItem('user_info') as string) as User).is_admin
      if(is_admin){
        return true;
      }else{
        return false
      }
    }
  }
  // can we access the children of this route
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
    // The user must not only logged but also be an admin in order to access this route
    if(!localStorage.getItem('user_info')){
      this.router.navigate([''])
      return false
    }else{
      const is_admin = (JSON.parse(localStorage.getItem('user_info') as string) as User).is_admin
      if(is_admin){
        return true;
      }else{
        return false
      }
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class CustomerGuardService implements CanActivate, CanActivateChild {

  constructor(
    private router: Router,
  ) { }
  // Can we activate this route: return true if Yes, otherwise no
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // The user must not only logged but also be a regular user in order to access this route
    if(!localStorage.getItem('user_info')){
      this.router.navigate([''])
      return false
    }else{
      const is_admin = (JSON.parse(localStorage.getItem('user_info') as string) as User).is_admin
      if(!is_admin){
        return true;
      }else{
        return false
      }
    }
  }
  // can we access the children of this route
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
    // The user must not only logged but also be a regular user in order to access this route
    if(!localStorage.getItem('user_info')){
      this.router.navigate([''])
      return false
    }else{
      const is_admin = (JSON.parse(localStorage.getItem('user_info') as string) as User).is_admin
      if(!is_admin){
        return true;
      }else{
        return false
      }
    }
  }
}
