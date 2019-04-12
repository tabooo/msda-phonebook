import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private api: ApiService) {
  }

  filter(filterBody): Observable<any> {
    return this.api.post('/user/getUsers', {}, filterBody).map(data => data.json());
  }

  getUserRightObject(userId): Observable<any> {
    return this.api.get('/user/getUserRightObject', {userId: userId}).map(data => data.json());
  }

  addUserRight(userId, rightId): Observable<any> {
    return this.api.get('/user/addUserRight', {userId: userId, rightId: rightId}).map(data => data.json());
  }

  removeUserRight(userId, rightId): Observable<any> {
    return this.api.get('/user/removeUserRight', {userId: userId, rightId: rightId}).map(data => data.json());
  }

  addUser(request): Observable<any> {
    return this.api.post('/user/addUser', {}, request).map(data => data.json());
  }

  deleteUser(userId): Observable<any> {
    return this.api.get('/user/deleteUser', {userId: userId}).map(data => data.json());
  }

  saveUserPassword(requestParams): Observable<any> {
    return this.api.get('/user/saveUserPassword', requestParams).map(data => data.json());
  }

  getUserInfo(): Observable<any> {
    return this.api.get('/user/getUserInfo', {}).map(data => data.json());
  }

  saveMyPassword(requestParams): Observable<any> {
    return this.api.get('/user/saveMyPassword', requestParams).map(data => data.json());
  }
}
