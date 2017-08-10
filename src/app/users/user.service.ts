import { Injectable } from '@angular/core';
import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from './user';
import {Profile} from './profile';
import { Role } from './roles/role';
import { ReplaySubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import * as firebase from 'firebase/app';

@Injectable()
export class UserService {

  app;
  constructor(private db: AngularFireDatabase,
              private afAuth: AngularFireAuth ) { }

  getUsers(): FirebaseListObservable<User[]> {
    return this.db.list('users');
  }

  getUser($key: string): FirebaseObjectObservable<User[]> {
    return this.db.object('users/' + $key);
  }

  updateUserProfile(user: User) {
    const resultSubject = new ReplaySubject(1);
    if (user !== undefined && user.$key !== undefined) {
      const dataToUpdate = {};
      dataToUpdate[`users/${user.$key}/profile/username`] =
        user.profile.username;
      dataToUpdate[`users/${user.$key}/profile/displayName`] =
        user.profile.displayName;
      this.db.object('/')
        .update(dataToUpdate)
        .then(() => {
          resultSubject.next(user);
        })
        .catch(err => {
          resultSubject.error(err);
        });
    }
    return resultSubject;
  }

  createUser(user: User): ReplaySubject<any> {
    const resultSubject = new ReplaySubject(1);

    if (!this.app) {
      this.app = firebase.initializeApp(environment.firebase, 'secondary');
    }
    this.app.auth().createUserWithEmailAndPassword(user.profile.email, user.password)
     .then(fbAuth => {
       const updateUserData = {};
       updateUserData[`roles/${user.role.$key}/users/${fbAuth.uid}`] = true;
       updateUserData[`users/${fbAuth.uid}`] = {
        profile: {
          displayName: user.profile.displayName,
          email: user.profile.email,
          username: user.profile.username,
         },
        role: {
          id: user.role.$key,
          name: user.role.name
        }
       };
       this.db.object('/').update(updateUserData)
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

  deleteUser(user: User): ReplaySubject<any> {
    const resultSubject = new ReplaySubject(1);
    if (user !== undefined && user.$key !== undefined) {
      const dataToDelete = {};
      dataToDelete[`users/${user.$key}`] = null;
      dataToDelete[`roles/${user.role.id}/users/${user.$key}`] = null;
      this.db.object('/').update(dataToDelete)
        .then(() => {
          resultSubject.next(user);
        })
        .catch(err => {
          resultSubject.error(err);
        });
    }
    return resultSubject;
  }

}
