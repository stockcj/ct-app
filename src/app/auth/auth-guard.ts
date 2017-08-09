import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const roles = route.data['roles'] as Array<string>;
    return this.auth.isAuthenticated(roles).do(authenticated => {
      if (!authenticated) {
        this.router.navigate(['/login']);
      }
    });
  }
}
