import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { User } from '../user';

@Component({
  selector: 'ct-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css'],
  animations: [
    trigger('flyInOut', [
      state('all', style({
        transform: 'translateX(0)'
      })),
      transition(':enter', [
        style({
          transform: 'translateX(-100%)'
        }),
        animate('300ms 100ms ease-in')
      ]),
      transition(':leave', [
        style({
          transform: 'translateX(100%)'
        }),
        animate('300ms 100ms ease-out')
      ])
    ])
  ]
})
export class UserItemComponent implements OnInit {

  state = 'all';

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
