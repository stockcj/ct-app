import { Component, OnInit, Input } from '@angular/core';
import { User } from '../users/user';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';

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
    this.user = auth.currentUser();
  }

  logout(){
    this.router.navigate(['/login']).then(() => {
      this.loginValidationBar.open("Logout successful", "Ok", {
        duration: 2000
      });
    });
  }

  ngOnInit() {
  }

}
