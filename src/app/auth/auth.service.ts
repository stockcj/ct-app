import { Injectable } from '@angular/core';
import { User } from '../users/user';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {

  constructor(public afAuth: AngularFireAuth) {
  }

  login(email, password): Observable<firebase.User> {
    const promise = <Promise<firebase.User>>
    this.afAuth.auth.signInWithEmailAndPassword(email, password);
    return Observable.fromPromise(promise);
  }

  currentUser(): any {
    return this.afAuth.authState;
  }

  isAuthenticated(): Observable<boolean> {
    return this.afAuth.authState
    .take(1)
    .map(authState => !!authState);
  }

  logOut(): any {
    const promise = this.afAuth.auth.signOut();
    return Observable.fromPromise(promise)
  }

}
