import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../users/user';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';

@Component({
  selector: 'ct-top-toolbar',
  templateUrl: './top-toolbar.component.html',
  styleUrls: ['./top-toolbar.component.css']
})
export class TopToolbarComponent implements OnInit {
  @Input()
  title : string;

  user: User;

  constructor(private auth: AuthService,
              public loginValidationBar: MdSnackBar,
              private router: Router) {
  }

  logout(){
    this.auth.logOut().subscribe(() => {
      this.router.navigate(['/login']).then(() => {
        this.loginValidationBar.open("Logout successful", "Ok", {
          duration: 2000
        });
      });
    });
  }

  ngOnInit() {
    this.auth.currentUser().subscribe(user => {
      this.user = user;
    })
  }

}
