import { MdSnackBar } from '@angular/material';
import { AuthService } from './../../auth/auth.service';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { User } from './../user';
import { Profile } from './../profile';

@Component({
  selector: 'ct-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: User;
  error: string;
  initialProfile: Profile;

  constructor(public updateValidationBar: MdSnackBar,
              private userService: UserService,
              private auth: AuthService) { }

  ngOnInit() {
    const sub = this.auth.currentUser().subscribe(user => {
      this.user = user;
      this.cloneInitial(this.user.profile);
      sub.unsubscribe();
    });
    this.user = new User();
    this.user.profile = new Profile();
    this.cloneInitial(this.user.profile);
  }

  cloneInitial(profile: Profile) {
    this.initialProfile = Object.assign(new Profile(), profile);
  }

  onSubmit(userProfileForm) {
    if (userProfileForm.form.valid) {
      const sub = this.userService.updateUserProfile(this.user)
       .subscribe(user => {
         this.updateValidationBar.open('Your profile has been updated', 'Ok', {
           duration: 3000.
         });
       },
      err => {
        this.error = err.message;
      },
      () => {
        sub.unsubscribe();
      }
      );
    }
  }

  profileIsChanged() {
    return this.user.profile.displayName !== this.initialProfile.displayName
      || this.user.profile.username !== this.initialProfile.username;
  }

}
