import { Component, OnInit, Input } from '@angular/core';
import { User } from '../users/user';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'ct-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users : FirebaseListObservable<User[]>;

  constructor(private db : AngularFireDatabase) { 
    
  }

  ngOnInit() {
    this.users = this.db.list('/users');
  }

}
