import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';

import {AuthService} from './auth.service';
import {ApiService} from "./api.service";

@Injectable()
export class AuthFilterService implements CanActivate {

  constructor(private api: ApiService, private router: Router, private auth: AuthService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.auth.hasValidToken().toPromise().then(data => {
      this.api.authUser = data;
      if (data.valid) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    }, error => {
      this.router.navigate(['/login']);
      return false;
    });
  }

}
