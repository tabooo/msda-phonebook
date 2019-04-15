import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {GlobalService} from "../../../../services/global.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PhonebookService} from "../../../../services/phonebook.service";

@Component({
  selector: 'app-phonebook-search-modal',
  templateUrl: './phonebook-search-modal.component.html',
  styleUrls: ['./phonebook-search-modal.component.css']
})
export class PhonebookSearchModalComponent implements OnInit {
  busy: Subscription;

  @Input() thisModal;
  @Input() myDiv;
  @Input() groupId;
  @Input() phones;

  @ViewChild('searchForm') searchForm;

  resultData;
  p = 1;
  total: number;

  filterBody = {
    firstResult: 0,
    maxResult: 15,
    phone: null,
    firstName: null,
    lastName: null,
  };

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private globalService: GlobalService,
              private phonebookService: PhonebookService) {
  }

  ngOnInit() {
    this.thisModal.open();
    this.search();
  }

  search() {
    this.filterBody.firstResult = 0;
    this.p = 1;
    this.total = 0;

    this.busy = this.phonebookService.searchPhones(this.filterBody).subscribe(data => {
      this.loadData(data);
    });
  }

  refresh(page) {
    this.filterBody.firstResult = (page - 1) * this.filterBody.maxResult;
    this.busy = this.phonebookService.searchPhones(this.filterBody).subscribe(data => {
      this.loadData(data);
      this.p = page;
    });
  }

  loadData(data) {
    if (this.phones && this.phones.length > 0) {
      this.phones.forEach((phone) => {
        data.result.forEach((item) => {
          if (phone.phoneId == item.phoneId) {
            item.inserted = true;
          }
        });
      });
    }

    this.resultData = data.result;
    this.total = data.count;
    this.triggerFalseClick();
  }

  clearForm() {
    this.searchForm.reset();
  }

  selectPhone(phone) {
    if (this.groupId) {
      var request = {
        phoneId: phone.phoneId,
        groupId: this.groupId
      };
      this.busy = this.phonebookService.addGroupPhone(request).subscribe(data => {
        this.phones.push(phone);
        this.search();
      });
    }
  }

  // ანგულარის ბაგის ჰაკი (არ არენდერებს ხოლმე მოდალში და ტაბსეტში)
  triggerFalseClick() {
    let el: HTMLElement = this.myDiv.nativeElement as HTMLElement;
    el.click();
  }

  showTest() {
  }

}
