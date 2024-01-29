import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor( 
    private authService: AuthService,
    private router: Router){

  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm){
    
    if( !authForm.valid){
      return;
    }
    
    const email = authForm.value.email;
    const password = authForm.value.password; 
    let authObs: Observable<AuthResponseData>;
   
    this.isLoading = true;

    if (this.isLoginMode){
     authObs = this.authService.login(email,password);
    }else {
      authObs = this.authService.signup(email, password)
    

    
}
      authObs.subscribe( resData => {
      console.log(resData);
      this.isLoading = false;
      this.router.navigate(['/recipes'])

    }, errorMessage=> {
      this.error = errorMessage;
      this.isLoading = false;
    })
    console.log(authForm.value);
    authForm.reset();
    
  }
}
