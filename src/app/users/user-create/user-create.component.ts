import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'ct-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  @Input()
  creatingUser: boolean;
  @Input()
  user: User;
  @Input()
  error: string;

  @Output()
  creatingUserEvent = new EventEmitter<boolean>();

  @Output()
  createUserEvent = new EventEmitter<User>();

  constructor() {
    this.clear();
   }

  ngOnInit() {
  }

  creatingNewUser(value) {
    this.creatingUser = value;
    this.creatingUserEvent.emit(value);
  }

  onSubmit(userForm) {
    if (userForm.form.valid) {
      this.createUserEvent.emit(this.user);
    }
  }

  clear() {
    this.user = new User();
  }

}
