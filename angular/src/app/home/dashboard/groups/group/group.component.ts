import {
  Component,
  ComponentFactoryResolver,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GlobalService} from "../../../../services/global.service";
import {PhonebookService} from "../../../../services/phonebook.service";
import {Subscription} from "rxjs";
import {PhonebookSearchModalComponent} from "../../phonebook/phonebook-search-modal/phonebook-search-modal.component";
import {BsModalComponent} from "ng2-bs3-modal";

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  @Input() groupId;
  @Input() tabs;
  @Input() mainTabset;
  @Input() curTab;

  @ViewChild('showButton') myDiv: ElementRef;

  busy: Subscription;
  modalCssClass = 'modal-xl';

  @ViewChild('modalSearchPhones') modalSearchPhones: BsModalComponent;
  @ViewChild('searchPhonesBody', {read: ViewContainerRef}) searchPhonesBody;

  group = {
    groupId: null,
    name: null,
    state: null,
    userId: null,
    insertDate: null,
    updateDate: null,
    phones: []
  };

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private globalService: GlobalService,
              private resolver: ComponentFactoryResolver,
              private phonebookService: PhonebookService) {
  }

  ngOnInit() {
    if (!this.groupId) {
      this.activatedRoute.params.subscribe(params => {
        this.groupId = params['id'];
      });
    }
    this.getGroup();
  }

  getGroup() {
    this.busy = this.phonebookService.getGroup({groupId: this.groupId}).subscribe(data => {
      this.group = data;
      if(this.curTab){
        this.curTab.title = data.name + '(' + data.phones.length + ')';
      }
    });
  }

  removeGroupPhone(phoneId) {
    this.busy = this.phonebookService.removeGroupPhone({phoneId: phoneId, groupId: this.groupId}).subscribe(data => {
      this.getGroup();
    });
  }

  openPhoneSearchModal() {
    this.searchPhonesBody.clear();
    const factory = this.resolver.resolveComponentFactory(PhonebookSearchModalComponent);
    const compRef = this.searchPhonesBody.createComponent(factory);
    compRef.instance.thisModal = this.modalSearchPhones;
    compRef.instance.myDiv = this.myDiv;
    compRef.instance.groupId = this.groupId;
    compRef.instance.phones = this.group.phones;
  }

  // ანგულარის ბაგის ჰაკი (არ არენდერებს ხოლმე მოდალში და ტაბსეტში)
  triggerFalseClick() {
    let el: HTMLElement = this.myDiv.nativeElement as HTMLElement;
    el.click();
  }

  showTest() {
  }
}
