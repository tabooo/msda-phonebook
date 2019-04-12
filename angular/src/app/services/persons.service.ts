import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class PersonsService {

  constructor(private api: ApiService) {
  }

  filter(filterBody): Observable<any> {
    return this.api.post('/person/searchPerson', {}, filterBody).map(data => data.json());
  }

  getPersonDetails(filterParams): Observable<any> {
    return this.api.get('/person/getPersonDetails', filterParams).map(data => data.json());
  }

  getPersonsAutos(filterParams): Observable<any> {
    return this.api.get('/vehicle/getPersonsAutos', filterParams).map(data => data.json());
  }

  getPermitions(filterParams): Observable<any> {
    return this.api.get('/vehicle/getPermitions', filterParams).map(data => data.json());
  }

  getPersonsWeaponx(filterParams): Observable<any> {
    return this.api.get('/weapon/getPersonsWeaponx', filterParams).map(data => data.json());
  }

  getPersonsProtocolxs(filterParams): Observable<any> {
    return this.api.get('/protocol/getPersonsProtocolxs', filterParams).map(data => data.json());
  }

  getPersonPhotos(filterParams): Observable<any> {
    return this.api.get('/person/getPersonPhotos', filterParams).map(data => data.json());
  }

  searchForeignPersons(filterBody): Observable<any> {
    return this.api.post('/foreignPersons/searchPersons', {}, filterBody).map(data => data.json());
  }

  getForeignPersonDetails(filterParams): Observable<any> {
    return this.api.get('/foreignPersons/getPersonDetails', filterParams).map(data => data.json());
  }

  getPersonMarryingActs(filterParams): Observable<any> {
    return this.api.get('/acts/getPersonMarryingActs', filterParams).map(data => data.json());
  }

  getPersonWitnessActs(filterParams): Observable<any> {
    return this.api.get('/acts/getPersonWitnessActs', filterParams).map(data => data.json());
  }

  getBirthActs(filterParams): Observable<any> {
    return this.api.get('/acts/getBirthActs', filterParams).map(data => data.json());
  }


  getAdoptionActs(filterParams): Observable<any> {
    return this.api.get('/acts/getAdoptionActs', filterParams).map(data => data.json());
  }

  getDeathActs(filterParams): Observable<any> {
    return this.api.get('/acts/getDeathActs', filterParams).map(data => data.json());
  }

  getDivorceActs(filterParams): Observable<any> {
    return this.api.get('/acts/getDivorceActs', filterParams).map(data => data.json());
  }

  getSiblingActs(filterParams): Observable<any> {
    return this.api.get('/acts/getSiblingActs', filterParams).map(data => data.json());
  }
  getPersonRelatives(filterParams): Observable<any> {
    return this.api.get('/person/getPersonRelatives',  filterParams).map(data => data.json());
  }

  getLikelySiblingActs(filterParams): Observable<any> {
    return this.api.get('/acts/getLikelySiblingActs' + filterParams, {}).map(data => (data ? data.json() : []));
  }

  getFatherhoodActs(filterParams): Observable<any> {
    return this.api.get('/acts/getFatherhoodActs', filterParams).map(data => (data ? data.json() : []));
  }

  getPersonStructureRelatives(filterParams): Observable<any> {
    return this.api.get('/person/getPersonStructureRelatives', filterParams).map(data => (data ? data.json() : []));
  }

  getLikelyAdoptionActs(filterParams): Observable<any> {
    return this.api.get('/acts/getLikelyAdoptionActs' + filterParams, {}).map(data => (data ? data.json() : []));
  }

  getLikelyDeathActs(filterParams): Observable<any> {
    return this.api.get('/acts/getLikelyDeathActs' + filterParams, {}).map(data => (data ? data.json() : []));
  }

  getLikelyDivorceActs(filterParams): Observable<any> {
    return this.api.get('/acts/getLikelyDivorceActs' + filterParams, {}).map(data => (data ? data.json() : []));
  }

  getLikelyFatherhoodActs(filterParams): Observable<any> {
    return this.api.get('/acts/getLikelyFatherhoodActs' + filterParams, {}).map(data => (data ? data.json() : []));
  }

  getLikelyBirthActs(filterParams): Observable<any> {
    return this.api.get('/acts/getLikelyBirthActs' + filterParams, {}).map(data => (data ? data.json() : []));
  }

  getPersonLikelyMarryingActs(filterParams): Observable<any> {
    return this.api.get('/acts/getPersonLikelyMarryingActs' + filterParams, {}).map(data => (data ? data.json() : []));
  }

  getAddressTree(filterParams): Observable<any> {
    return this.api.get('/person/getAddressTree', filterParams).map(data => data.json());
  }

  getPersonDocumentTypes(filterParams): Observable<any> {
    return this.api.get('/person/getPersonDocumentTypes', filterParams).map(data => data.json());
  }

  getPersonPhoto(personalNo): string {
    return this.api.getUrl() + '/person/getPersonPhoto?personalNo=' + personalNo;
  }

  getCheck(filterParams): Observable<any> {
    return this.api.get('/blackPersons/getCheck' + filterParams, {}).map(data => data.json());
  }

  getPersonCrimeFacts(filterParams): Observable<any> {
    return this.api.get('/crime/getPersonCrimeFacts', filterParams).map(data => data.json());
  }
}
