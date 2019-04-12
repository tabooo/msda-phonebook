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
    return this.api.post('/phonebook/removePhone', {}, filterBody).map(data => data.json());
  }
}
