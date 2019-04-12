import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {AuthService} from './auth.service';
import {ApiService} from './api.service';

@Injectable()
export class LoginFilterService implements CanActivate {

  constructor(private api: ApiService, private router: Router, private auth: AuthService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.auth.hasValidToken().toPromise().then(data => {
      if (data.valid) {
        this.router.navigate(['/']);
        return false;
      }
      this.api.authUser = null;
      return true;
    });

  }

}
