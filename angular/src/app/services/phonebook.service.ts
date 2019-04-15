import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class PhonebookService {

  constructor(private api: ApiService) {
  }

  searchPhones(filterBody): Observable<any> {
    return this.api.post('/phonebook/searchPhones', {}, filterBody).map(data => data.json());
  }

  addPhone(filterBody): Observable<any> {
    return this.api.post('/phonebook/addPhone', {}, filterBody).map(data => data.json());
  }

  removePhone(filterBody): Observable<any> {
    return this.api.get('/phonebook/removePhone', filterBody).map(data => data.json());
  }

  getGroups(): Observable<any> {
    return this.api.get('/phonebook/getGroups', {},).map(data => data.json());
  }

  getGroup(filterBody): Observable<any> {
    return this.api.get('/phonebook/getGroup', filterBody,).map(data => data.json());
  }

  addGroup(filterBody): Observable<any> {
    return this.api.post('/phonebook/addGroup', {}, filterBody).map(data => data.json());
  }

  removeGroup(filterBody): Observable<any> {
    return this.api.get('/phonebook/removeGroup', filterBody).map(data => data.json());
  }

  removeGroupPhone(filterBody): Observable<any> {
    return this.api.get('/phonebook/removeGroupPhone', filterBody).map(data => data.json());
  }

  addGroupPhone(filterBody): Observable<any> {
    return this.api.post('/phonebook/addGroupPhone', {}, filterBody).map(data => data.json());
  }
}
