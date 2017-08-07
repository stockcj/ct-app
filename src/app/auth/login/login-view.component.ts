import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthUser } from '../auth-user';

@Component({
  selector: 'ct-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})
export class LoginViewComponent implements OnInit {
  user: AuthUser;

  @Input()
  disableButton: boolean;

  @Input()
  buttonText: string;

  @Input()
  signInError: string;

  @Output('login')
  tryLoginEmitter = new EventEmitter<AuthUser>();

  tryLogin() {
    this.tryLoginEmitter.emit(this.user);
  }

  constructor() {
    this.user = new AuthUser();
   }

  ngOnInit() {
  }

}
