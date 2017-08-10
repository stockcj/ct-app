import { RolesService } from './users/roles/roles.service';
import { AuthGuard } from './auth/auth-guard';
import { UserService } from './users/user.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { MaterialComponents } from './material-components/app.material.module';
import { TopToolbarComponent } from './top-toolbar/top-toolbar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { LoginViewComponent } from './auth/login/login-view.component';
import { AuthService } from './auth/auth.service';
import { UsersViewComponent } from './users/users-view/users-view.component';
import { UsersListComponent } from './users/users-view/users-list.component';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { UserItemComponent } from './users/user-item/user-item.component';
import { EqualTextValidator} from './users/equal.validator';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { AdminComponent } from './admin/admin.component';
import { AdminOptionsComponent } from './admin/admin-options/admin-options.component';
import { ContingencyManagementComponent } from './contingency-management/contingency-management.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: {roles: ['admin']}
  },
  { path: 'admin/users',
    component: UsersViewComponent,
    canActivate: [AuthGuard],
    data: {roles: ['admin']}
  },
  { path: 'admin/contingency-management',
    component: ContingencyManagementComponent,
    canActivate: [AuthGuard],
    data: {roles: ['admin']}
  },
  { path: 'profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    AngularFontAwesomeModule,
    BrowserAnimationsModule,
    MaterialComponents,
    FlexLayoutModule
  ],
  declarations: [
    AppComponent,
    TopToolbarComponent,
    HomeComponent,
    LoginComponent,
    LoginViewComponent,
    UsersViewComponent,
    UsersListComponent,
    UserCreateComponent,
    UserItemComponent,
    EqualTextValidator,
    UserProfileComponent,
    AdminComponent,
    AdminOptionsComponent,
    ContingencyManagementComponent
  ],
  providers: [AuthService,
              UserService,
              RolesService,
              AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
