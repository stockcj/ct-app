import { Injectable } from '@angular/core';
import { User } from '../users/user';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  users : User[];
  constructor() { 
    this.users = [
      {username: 'christopher', password: '123', email: 'chris@example.com'}
    ];
  }

  login(username, password) : Observable<User> {
    let userAccepted = this.users
      .filter(x => x.username === username)
      .filter(y => y.password === password);
    if(userAccepted && userAccepted.length === 1) {
      localStorage.setItem('currentUser', JSON.stringify({token: "jwt will come later", username: userAccepted[0].username}))
      return Observable.of(userAccepted[0]);
    } else {
      return Observable.of(null);
    }
  }

  currentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  logOut() {
    return localStorage.removeItem('currentUser');
  }

}
