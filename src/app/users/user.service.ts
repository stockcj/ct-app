import { Injectable } from '@angular/core';
import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from './user';
import { ReplaySubject } from 'rxjs';
import { environment } from '../../environments/environment';
import * as firebase from 'firebase/app';

@Injectable()
export class UserService {

  app;
  constructor(private db: AngularFireDatabase,
              private afAuth: AngularFireAuth ) { }

  getUsers(): FirebaseListObservable<User[]> {
    return this.db.list('/users');
  }

  createUser(user: User): ReplaySubject<any> {
    const resultSubject = new ReplaySubject(1);

    if (!this.app) {
      this.app = firebase.initializeApp(environment.firebase, 'secondary');
    }
    this.app.auth().createUserWithEmailAndPassword(user.email, user.password)
     .then(fbAuth => {
       this.db.list('users').push({
         email: user.email,
         username: user.username,
         uid: fbAuth.uid
       })
        .then(() => {
          resultSubject.next(user);
        })
        .catch(err => {
          resultSubject.error(err);
        });
     })
     .catch(err => {
       resultSubject.error(err);
     });
    return resultSubject;
  }

  deleteUser($key: string) {
    this.db.list('users').remove($key);
  }

}
