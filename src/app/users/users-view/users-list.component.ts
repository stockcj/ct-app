import { UserService } from './../user.service';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'ct-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  @Input()
  users: Observable<User[]>;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  deleteUser($key) {
    this.userService.deleteUser($key);
  }

}
