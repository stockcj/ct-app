import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Role } from './role';

@Injectable()
export class RolesService {

  constructor(private db: AngularFireDatabase) {}

  getRoles(): FirebaseListObservable<Role[]> {
    return this.db.list('roles');
  }

}
