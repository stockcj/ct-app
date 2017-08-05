import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ct-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})
export class LoginViewComponent implements OnInit {
  @Input()
  disableButton : boolean;

  @Input()
  buttonText : string;

  @Input()
  user : any;

  @Input()
  signInError : string;

  @Output('login')
  tryLoginEmitter = new EventEmitter();

  tryLogin(){
    this.tryLoginEmitter.emit(this.user);
  };

  constructor() {
    this.user = {};
   }

  ngOnInit() {
  }

}
