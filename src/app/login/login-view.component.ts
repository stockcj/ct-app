import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ct-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})
export class LoginViewComponent implements OnInit {
  
  @Input()
  signInError : string;

  constructor() { }

  ngOnInit() {
  }

}