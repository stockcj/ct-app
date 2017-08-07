import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from './user';

@Injectable()
export class UserService {

  constructor(private db: AngularFireDatabase,
              private afAuth: AngularFireAuth ) { }

  getUsers(): FirebaseListObservable<User[]> {
    return this.db.list('/users');
  }

  createUser(user: User) {
    this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
     .then(res => {
       this.db.list('users').push({
         email: user.email,
         username: user.username,
         uid: res.uid
       });
     })
    .catch(err => {
      console.error('err', err);
    })
  }

  deleteUser($key: string) {
    this.db.list('users').remove($key);
  }

}
