import { UserService } from './../user.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'ct-users-view',
  templateUrl: './users-view.component.html'
})
export class UsersViewComponent implements OnInit {

  users: Observable<User[]>;

  creatingUser: boolean;
  user: User;
  error: string;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.user = new User();
    this.users = this.userService.getUsers();
  }

  creatingUserEvent(value) {
    this.creatingUser = value;
  }

  createUserEvent(user) {
    this.userService.createUser(user)
     .subscribe(() => {
       this.creatingUser = false;
       this.error = null;
     },
     err => {
      this.error = err.message;
     });
  }

}
