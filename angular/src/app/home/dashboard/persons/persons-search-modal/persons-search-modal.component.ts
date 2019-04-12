import {AfterContentInit, Component, Input, OnInit} from '@angular/core';
import {PersonsService} from '../../../../services/persons.service';
import {GlobalService} from '../../../../services/global.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-persons-search-modal',
  templateUrl: './persons-search-modal.component.html',
  styleUrls: ['./persons-search-modal.component.css']
})
export class PersonsSearchModalComponent implements OnInit {
  busy: Subscription;

  @Input() filterBody;
  @Input() tabs;
  @Input() mainTabset;
  @Input() thisModal;
  @Input() myDiv;

  searchedPersons = [];
  pageSearchPersons = 1;
  totalSearchPersons: number;

  filterBodySearchPersons = {
    firstResult: 0,
    maxResult: 5,
    personalNo: null,
    firstName: null,
    lastName: null,
    personType: null,
    birthDateFrom: null,
    birthDateTo: null,
    genderId: null
  };

  constructor(private personsService: PersonsService,
              private globalService: GlobalService) {
  }

  ngOnInit() {
    this.search();
  }

  search() {
    this.filterBodySearchPersons.firstResult = 0;
    this.searchedPersons = [];
    this.thisModal.open();

    if (this.filterBody.personalNo) {
      this.filterBodySearchPersons.personalNo = this.filterBody.personalNo;
    } else {
      this.filterBodySearchPersons.firstName = this.filterBody.firstName;
      this.filterBodySearchPersons.lastName = this.filterBody.lastName;
      this.filterBodySearchPersons.birthDateFrom = this.filterBody.birthDateFrom;
      this.filterBodySearchPersons.birthDateTo = this.filterBody.birthDateTo;
    }

    this.busy = this.personsService.filter(this.filterBodySearchPersons).subscribe(data => {
      if (data.count === 1) {
        this.thisModal.close();
        this.openPerson(data.result[0]);
      } else if (data.count > 1) {
        this.pageSearchPersons = 1;
        this.searchedPersons = data.result;
        this.totalSearchPersons = data.count;
      }
    });
  }

  changePaging(page) {
    this.filterBodySearchPersons.firstResult = (page - 1) * this.filterBodySearchPersons.maxResult;
    this.busy = this.personsService.filter(this.filterBodySearchPersons).subscribe(data => {
      this.searchedPersons = data.result;
      this.totalSearchPersons = data.count;
      this.pageSearchPersons = page;
    });
  }

  openPerson(data) {
    this.globalService.openPerson({
      personId: data.personId,
      personType: data.personType
    }, this.tabs, this.mainTabset, this.myDiv);
    this.thisModal.close();
  }

  getGenderName(genderId) {
    return this.globalService.getGenderName(genderId);
  }

  getPersonPhoto(data) {
    return this.personsService.getPersonPhoto(data.personalNo);
  }

  showTest() {

  }
}
