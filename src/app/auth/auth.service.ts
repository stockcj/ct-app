import { FirebaseObjectObservable } from 'angularfire2/database';
import { UserService } from './../users/user.service';
import { Injectable } from '@angular/core';
import { User } from '../users/user';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {

  constructor(public afAuth: AngularFireAuth,
              private userService: UserService) {
  }

  login(email, password): Observable<firebase.User> {
    const promise = <Promise<firebase.User>>
    this.afAuth.auth.signInWithEmailAndPassword(email, password);
    return Observable.fromPromise(promise);
  }

  currentUser(): Observable<User> {
    return this.afAuth.authState
      .switchMap((authState: firebase.User) => authState ?
        this.userService.getUser(authState.uid) :
        Observable.of(null));
  }

  isAuthenticated(roles: string[]): Observable<boolean> {
    return this.currentUser()
    .switchMap(user => roles ?
      Observable.of(!!user && roles.indexOf(user.role.name) > -1) :
      Observable.of(!!user)
    );
  }

  logOut(): any {
    const promise = this.afAuth.auth.signOut();
    return Observable.fromPromise(promise);
  }

}
