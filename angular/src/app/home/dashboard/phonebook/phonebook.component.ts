import {Component, ElementRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {Location} from "@angular/common";
import {Subscription} from "rxjs";
import {TabsetComponent} from "ngx-bootstrap";
import {ActivatedRoute, Router} from "@angular/router";
import {GlobalService} from "../../../services/global.service";
import {PhonebookService} from "../../../services/phonebook.service";
import {BsModalComponent} from "ng2-bs3-modal";

@Component({
  selector: 'app-phonebook',
  templateUrl: './phonebook.component.html',
  styleUrls: ['./phonebook.component.css']
})
export class PhonebookComponent implements OnInit {
  @ViewChild('showButtonS') myDiv: ElementRef;

  location: Location;
  busy: Subscription;
  busyPhoneDetail: Subscription;
  tabs: any[] = [];
  @ViewChild('mainTabset') mainTabset: TabsetComponent;
  @ViewChild('searchForm') searchForm;
  @ViewChild('phoneDetailForm') phoneDetailForm;
  @ViewChild('phoneDetail', {read: ViewContainerRef}) phoneDetail;

  modalCssClass = 'modal-xl';
  modalCssClass2 = 'modal-xl';
  @ViewChild('modalPhoneDetail') modalPhoneDetail: BsModalComponent;

  phoneId;
  tmpPhoneDetailMsg = "";
  tmpPhoneDetail = {
    phoneId: null,
    firstName: null,
    lastName: null,
    phone: null
  };

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

  constructor(private locationService: Location,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private globalService: GlobalService,
              private phonebookService: PhonebookService) {
    this.location = locationService;
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.phoneId = params['phoneId'];
    });

    if (this.phoneId) {
      this.openPhoneDetail(null);
    }
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
    this.resultData = data.result;
    this.total = data.count;
    this.triggerFalseClick();
  }

  clearForm() {
    this.searchForm.reset();
  }

  openPhoneDetail(phone) {
    if (phone) {
      this.globalService.openPerson(phone, this.tabs, this.mainTabset, this.myDiv);
    } else {
      this.globalService.openPerson({
        phoneId: this.phoneId
      }, this.tabs, this.mainTabset, this.myDiv);
    }
  }

  removeTabHandler(tab: any): void {
    if (this.tabs.indexOf(tab) == 0) {
      const url = this.router.createUrlTree(['/phonebook']).toString();
      this.location.go(url);
    }
    this.tabs.splice(this.tabs.indexOf(tab), 1);
  }

  selectTabHandler(tab: any): void {
    this.globalService.createUrl(tab);
  }

  savePhone() {
    this.busyPhoneDetail = this.phonebookService.addPhone(this.tmpPhoneDetail).subscribe(data => {
      if (data.valid) {
        this.modalPhoneDetail.close();
        this.phoneDetailForm.reset();
        this.tmpPhoneDetailMsg = "";
        this.search();
      } else {
        this.tmpPhoneDetailMsg = data.description;
      }
    });
  }

  openPhoneDetailModal(phoneDetail) {
    if (phoneDetail) {
      this.tmpPhoneDetail.phone = phoneDetail.phone;
      this.tmpPhoneDetail.firstName = phoneDetail.firstName;
      this.tmpPhoneDetail.lastName = phoneDetail.lastName;
      this.tmpPhoneDetail.phoneId = phoneDetail.phoneId;
    }
    this.tmpPhoneDetailMsg = "";
    this.modalPhoneDetail.open();
  }

  // ანგულარის ბაგის ჰაკი (არ არენდერებს ხოლმე მოდალში და ტაბსეტში)
  triggerFalseClick() {
    let el: HTMLElement = this.myDiv.nativeElement as HTMLElement;
    el.click();
  }

  showTest() {
  }
}
