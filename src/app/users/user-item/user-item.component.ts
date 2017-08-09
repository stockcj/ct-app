import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'ct-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {

  @Input()
  user: User;

  @Output()
  deleteUserEvent = new EventEmitter<User>();

  validateDelete: boolean;

  constructor() { }

  ngOnInit() {
  }

  deleteValidation(value: boolean) {
    this.validateDelete = value;
  }

  delete() {
    this.validateDelete = false;
    this.deleteUserEvent.emit(this.user);
  }

}
