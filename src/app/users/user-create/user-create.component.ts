import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs';
import { RolesService } from './../roles/roles.service';
import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { User } from '../user';
import { Role } from '../roles/role';

@Component({
  selector: 'ct-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit, OnDestroy {

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

  roles: Role[];
  sub: Subscription;

  constructor(private rs: RolesService) {
   }

  ngOnInit() {
    this.sub = this.rs.getRoles().subscribe(roles => {
      this.roles = roles;
      if (this.roles.length > 0) {
        this.user.role = roles[0];
      }
    });
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

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  clear() {
    this.user = new User();
  }

}
