import { Component, OnInit, OnDestroy } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ct-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy {
  
  loginError : string;
  request : Subscription;
  isDisabled : boolean;
  signInText = 'Sign In';

  constructor(public loginValidationBar: MdSnackBar, 
              private router : Router,
              private authService : AuthService) {
                this.authService.logOut();
   }

   login(user){
     this.isDisabled = true;
     this.signInText = "Signing in..."
     if(this.request){
       this.request.unsubscribe();
     }
    this.request = this.authService
    .login(user.username, user.password)
    .delay(3000)
    .subscribe(
      (lUser) => {
      if(lUser) {
        this.loginError = null;
        this.router.navigate(['/']).then(() => {
          this.loginValidationBar.open("Login successful", "Ok", {
            duration: 2000,
          });
        });
      } else {
        this.loginError = "Please check your username and password"
      }
    },
    (err) => {
      console.error(err);
      this.loginError = "An error occurred during login, see error in console.";
      this.isDisabled = false;
      this.signInText = "Sign in";
    },
    () => {
      console.log("Done");
      this.isDisabled = false;
      this.signInText = "Sign in";

    }
    );
    
    
   }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.request) {
      this.request.unsubscribe();
    }
  }

}
