import {Component, ElementRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {Location} from "@angular/common";
import {Subscription} from "rxjs";
import {TabsetComponent} from "ngx-bootstrap";
import {BsModalComponent} from "ng2-bs3-modal";
import {ActivatedRoute, Router} from "@angular/router";
import {GlobalService} from "../../../services/global.service";
import {PhonebookService} from "../../../services/phonebook.service";

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  @ViewChild('showButtonS') myDiv: ElementRef;

  location: Location;
  busy: Subscription;
  busyGroupDetail: Subscription;

  tabs: any[] = [];
  @ViewChild('mainTabset') mainTabset: TabsetComponent;
  @ViewChild('groupDetailForm') groupDetailForm;
  @ViewChild('phoneDetail', {read: ViewContainerRef}) phoneDetail;

  modalCssClass = 'modal-xl';
  modalCssClass2 = 'modal-xl';
  @ViewChild('modalGroupDetail') modalGroupDetail: BsModalComponent;

  groupId;
  tmpGroupDetailMsg = "";
  tmpGroupDetail = {
    groupId: null,
    name: null,
  };

  resultData;

  constructor(private locationService: Location,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private globalService: GlobalService,
              private phonebookService: PhonebookService) {
    this.location = locationService;
  }

  ngOnInit() {
    this.search();

    this.activatedRoute.params.subscribe(params => {
      this.groupId = params['groupId'];
    });

    if (this.groupId) {
      this.openGroupDetail(null);
    }
  }

  search() {
    this.busy = this.phonebookService.getGroups().subscribe(data => {
      this.resultData = data;
      this.triggerFalseClick();
    });
  }

  openGroupDetail(group) {
    if (group) {
      this.globalService.openGroup(group, this.tabs, this.mainTabset, this.myDiv);
    } else {
      this.globalService.openGroup({
        groupId: this.groupId
      }, this.tabs, this.mainTabset, this.myDiv);
    }
  }

  removeTabHandler(tab: any): void {
    if (this.tabs.indexOf(tab) == 0) {
      const url = this.router.createUrlTree(['/groups']).toString();
      this.location.go(url);
    }
    this.tabs.splice(this.tabs.indexOf(tab), 1);
  }

  selectTabHandler(tab: any): void {
    this.globalService.createUrl(tab);
  }

  saveGroup() {
    this.busyGroupDetail = this.phonebookService.addGroup(this.tmpGroupDetail).subscribe(data => {
      if (data.valid) {
        this.modalGroupDetail.close();
        this.groupDetailForm.reset();
        this.tmpGroupDetailMsg = "";
        this.search();
      } else {
        this.tmpGroupDetailMsg = data.description;
      }
    });
  }

  removeGroup(groupId) {
    this.busyGroupDetail = this.phonebookService.removeGroup({groupId: groupId}).subscribe(data => {
      this.search();
    });
  }

  openGroupDetailModal(groupDetail) {
    if (groupDetail) {
      this.tmpGroupDetail.name = groupDetail.name;
      this.tmpGroupDetail.groupId = groupDetail.groupId;
    }
    this.tmpGroupDetailMsg = "";
    this.modalGroupDetail.open();
  }

  // ანგულარის ბაგის ჰაკი (არ არენდერებს ხოლმე მოდალში და ტაბსეტში)
  triggerFalseClick() {
    let el: HTMLElement = this.myDiv.nativeElement as HTMLElement;
    el.click();
  }

  showTest() {
  }

}
