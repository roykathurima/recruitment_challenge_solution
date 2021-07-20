import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'
import { environment } from 'src/environments/environment';

// The shape of user
export interface User {
  email: string,
  name: string,
  phone_number: string,
  address: string,
  is_admin: boolean,
}

// Decorate the AuthService class to allow for Dependency Injection
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.apiUrl;

  constructor(
    // The FireBase Auth Service
    private auth: AngularFireAuth,
    // Angular's Default HTTP client
    private http: HttpClient,
    // Angular's routing service
    private router: Router
  ) { }

  // Get Use Profile
  getUserProfileWithEmail(email: string): Promise<User>{
    return new Promise((resolve, reject)=>{
      const url = this.apiUrl+"/get-user/";
      this.http.post(url, {email}).toPromise()
      .then(user=>{
        resolve((user as any).data as User)
      })
      .catch(err=>reject(err));
    })
  }

  login(email: string, password:string): Promise<User>{
    return new Promise((resolve, reject)=>{
      // First we signIn with Firebase
      this.auth.signInWithEmailAndPassword(email, password)
      .then(result=>{
        // Then we retrieve the users info
        this.getUserProfileWithEmail(email)
        .then(user=>{
          // If we need the user details anywhere in the app
          // Not ideal but it will work for now
          localStorage.setItem('user_info', JSON.stringify(user));
          resolve(user);
        })
        // consider signing out of Firebase... meh, that inconsequential for now since we are mainting our own state
        .catch(err=>reject(err));
      })
      .catch(err=>reject(err));
    })
  }

  register(user: User, password: string){
    return new Promise((resolve, reject)=>{
      // Create an Account with firebase
      this.createUserAccount(user.email, password)
      .then(result=>{
        // Create an account with the user on the database
        const url = this.apiUrl + "/add-user/";
        this.http.post(url, {...user}).toPromise()
        .then(rst=>resolve(rst))
        .catch(e=>reject(e))
      })
      .catch(err=>reject(err))
    })
  }
  
  // Create user Account in firebase
  createUserAccount(email: string, password: string){
    return new Promise((resolve, reject)=>{
      this.auth.createUserWithEmailAndPassword(email, password)
      .then(succcess=>resolve(succcess))
      .catch(err=>reject(err));
    })
  }

  // Send Password Reset Link with Firebase
  sendPasswordResetLink(email: string){
    return new Promise((resolve, reject)=>{
      this.auth.sendPasswordResetEmail(email)
      .then((success)=>resolve(success))
      .catch(err=>reject(err))
    })
  }

  logout(){
    // Remove the cached user info
    localStorage.removeItem('user_info');
    // navigate the user to the Login page
    this.router.navigate([''])
    // I think its trivial logging out using firebase since we are not keeping track of anything with it
  }
}
