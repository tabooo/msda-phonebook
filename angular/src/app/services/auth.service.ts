import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Rx';

import {ApiService} from './api.service';
import {LocalStorageService} from 'angular-2-local-storage';

@Injectable()
export class AuthService {

  constructor(private api: ApiService, private router: Router, private localStorageService: LocalStorageService) {
  }

  getAuthUser(): Observable<any> {
    return this.api.get('/user/isLogin', {}).map(data => data.json());
  }

  login(usercreds): Observable<any> {
    return this.api.post('/user/authenticate', {}, usercreds)
      .map(data => {
        return data.json();

      }, error => {
        return error;
      });
  }

  logout(): Observable<any> {
    return this.api.get('/user/logOut', {})
      .map(data => {
        this.localStorageService.clearAll();
        this.router.navigate(['/login']);
        return data;
      }, error => {
        return error;
      });
  }

  register(request): Observable<any> {
    return this.api.post('/user/register', {}, request)
      .map(data => {
        return data.json();

      }, error => {
        return error;
      });
  }

  recoverPassword(request): Observable<any> {
    return this.api.get('/user/recoverPassword', request)
      .map(data => {
        return data.json();

      }, error => {
        return error;
      });
  }

  hasValidToken(): Observable<any> {
    return this.api.get('/user/isLogin', {}).map(data => data.json()).catch(() => {
      // this.router.navigate(['/login']);
      return Observable.of(false);
    });
  }

}
