import { Subscription } from 'rxjs';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
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
export class TopToolbarComponent implements OnInit, OnDestroy {
  @Input()
  title: string;

  user: User;

  logoutSub: Subscription;
  currentUserSub: Subscription;

  constructor(private auth: AuthService,
              public loginValidationBar: MdSnackBar,
              private router: Router) {
  }

  logout() {
    this.logoutSub = this.auth.logOut().subscribe(() => {
      this.router.navigate(['/login']).then(() => {
        this.loginValidationBar.open('Logout successful', 'Ok', {
          duration: 2000
        });
      });
    });
  }

  ngOnInit() {
    this.currentUserSub = this.auth.currentUser().subscribe(user => {
      this.user = user;
     });
  }

  ngOnDestroy() {
    if (this.logoutSub) {
      this.logoutSub.unsubscribe();
    }
    if (this.currentUserSub) {
      this.currentUserSub.unsubscribe();
    }
  }

}
