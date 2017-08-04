import { Component, OnInit} from '@angular/core';
import { User } from "../users/user";
import { MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'ct-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  
  loginError : string;
  users : User[];
  constructor(public loginValidationBar: MdSnackBar, private router : Router) {
    this.users = [
      {username: 'christopher', password: '123', email: 'chris@example.com'}
    ];
   }

   login(user){
    let userAccepted = this.users
      .filter(x => x.username === user.username)
      .filter(y => y.password === user.password);
    if(userAccepted && userAccepted.length === 1) {
      this.loginError = null;
      this.router.navigate(['/']).then(() => {
        this.loginValidationBar.open("Login successful", "Ok", {
          duration: 2000,
        });
      });
    } else {
      this.loginError = "Please check your username and password"
    }
    
   }

  ngOnInit() {
  }

}
