import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { User } from './user';

@Injectable()
export class UserService {

  constructor(private db: AngularFireDatabase ) { }

  getUsers(): FirebaseListObservable<User[]> {
    return this.db.list('/users');
  }

  createUser(user: User) {
    this.db.list('users').push(user);
  }

  deleteUser($key: string) {
    this.db.list('users').remove($key);
  }

}
