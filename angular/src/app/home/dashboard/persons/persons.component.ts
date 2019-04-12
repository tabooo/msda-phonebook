import {ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PersonsService} from '../../../services/persons.service';
import {Subscription} from 'rxjs/Rx';
import {Location} from '@angular/common';
import {GlobalService} from '../../../services/global.service';
import {TabsetComponent} from 'ngx-bootstrap';
import {SelectComponent} from 'ng2-select';
import {
  AdvancedLayout, ButtonEvent, ButtonsConfig, ButtonsStrategy, ButtonType, GalleryService, Image, PlainGalleryConfig,
  PlainGalleryStrategy
} from '@ks89/angular-modal-gallery';
import {ITreeOptions, TREE_ACTIONS, TreeComponent, TreeNode} from 'angular-tree-component';
import {BsModalComponent} from 'ng2-bs3-modal';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None  // Enable dynamic HTML styles
})
export class PersonsComponent implements OnInit {
  @ViewChild('showButtonS') myDiv: ElementRef;
  @ViewChild('filterAddress') filterAddress: ElementRef;
  @ViewChild('modalAddresses') modalAddresses: BsModalComponent;
  modalCssClass = 'modal-xl';

  location: Location;
  busy: Subscription;
  tabs: any[] = [];
  @ViewChild('mainTabset') mainTabset: TabsetComponent;
  @ViewChild('searchForm') searchForm;
  @ViewChild('selectGender') public selectGender: SelectComponent;
  isCollapsed = true;
  resultData;
  p = 1;
  total: number;

  @ViewChild('personDetail', {read: ViewContainerRef}) personDetail;

  personId;
  personType;

  filterBody = {
    firstResult: 0,
    maxResult: 15,
    fullText: null,
    personalNo: null,
    firstName: null,
    lastName: null,
    personType: null,
    birthDateFrom: null,
    birthDateTo: null,
    genderId: null,
    address: null,
    birthPlace: null,
    firstNameEn: null,
    lastNameEn: null,
    motherPersonalNo: null,
    motherLastName: null,
    motherName: null,
    fatherName: null,
    fatherLastName: null,
    fatherPersonalNo: null,
    siblingName: null,
    siblingLastName: null,
    siblingPersonalNo: null,
    documentNumber: null,
    addressId: null,
    documentTypeId: null
  };
  birthDateFrom = null;
  birthDateTo = null;

  genders = [];
  documentTypes = [];

  @ViewChild(TreeComponent)
  private addressTree: TreeComponent;
  addressNodes = [];
  addressTreeOptions: ITreeOptions = {
    getChildren: (node: TreeNode) => {
      return this.getAddressChildrens(node);
    },
    actionMapping: {
      mouse: {
        dblClick: (tree, node, $event) => {
          this.filterBody.addressId = node.data.address.addressId;
          this.addressName = node.data.address.nameFull;
          this.modalAddresses.close();
        }
      }
    }
  };
  addressName;

  personTypes = [
    {
      id: '1',
      text: 'პიროვნებები'
    },
    {
      id: '2',
      text: 'ისტორია'
    },
    {
      id: '3',
      text: 'არაიდენტიფიცირებული პირები'
    },
    {
      id: '4',
      text: 'არაიდენტიფიცირებული / ისტორია'
    }
  ];
  datepickerConfig = {
    firstDayOfWeek: 'mo',
    format: 'YYYY-MM-DD',
    locale: 'ka',
    showMultipleYearsNavigation: true
  };

  /*options: DatepickerOptions = {
    minYear: 1900,
    displayFormat: 'YYYY-MM-DD',
    dayNamesFormat: 'dd',
    firstCalendarDay: 1,
    locale: enLocale,
    barTitleIfEmpty: 'აირჩიეთ თარიღი',
    placeholder: 'აირჩიეთ თარიღი',
    useEmptyBarTitle: false
  };*/

  personPhotos: Image[] = [];
  customPlainGalleryRowConfig: PlainGalleryConfig = {
    strategy: PlainGalleryStrategy.CUSTOM,
    layout: new AdvancedLayout(-1, true)
  };
  buttonsConfigAdvanced: ButtonsConfig = {
    visible: true,
    strategy: ButtonsStrategy.CUSTOM,
    buttons: [
      {
        className: 'ext-url-image',
        type: ButtonType.CUSTOM,
        title: 'დეტალური ინფორმაცია',
        fontSize: '20px'
      }, {
        className: 'close-image',
        type: ButtonType.CLOSE
      }
    ]
  };

  constructor(private personsService: PersonsService,
              private router: Router,
              private locationService: Location,
              private activatedRoute: ActivatedRoute,
              private globalService: GlobalService,
              private galleryService: GalleryService) {
    this.location = locationService;
  }

  ngOnInit() {

    this.genders = this.globalService.genders;
    this.personsService.getAddressTree({addressId: ''}).subscribe(data => {
      data.forEach((addr, index) => {
        this.addressNodes.push({
          name: addr.nameFull,
          hasChildren: true,
          address: addr
        });
        this.addressTree.treeModel.update();
        this.triggerFalseClick();
      });
    });


    this.personsService.getPersonDocumentTypes({}).subscribe(data => {
      const dTypes = [];
      data.forEach((type, index) => {
        dTypes.push({
          text: type.description,
          id: type.typeId
        });
      });
      this.documentTypes = dTypes;
    });

    this.activatedRoute.params.subscribe(params => {
      this.personId = params['id'];
      this.personType = params['personType'];
    });

    if (this.personId && this.personType) {
      this.openPerson(null);
    }
  }

  getAddressChildrens(node) {
    return new Promise((resolve, reject) => {
      this.personsService.getAddressTree({addressId: node.data.address.addressId}).subscribe(data => {
        const newNodes = [];
        data.forEach((addr, index) => {
          if (addr.nameShort) {
            newNodes.push({
              name: addr.nameShort,
              hasChildren: true,
              address: addr
            });
          }
        });
        setTimeout(() => resolve(newNodes), 1);
      });
    });
  }

  search(detailSearch: boolean = true) {
    this.filterBody.firstResult = 0;
    this.p = 1;
    this.total = 0;

    if (detailSearch) {
      this.filterBody.fullText = null;
    }

    if (this.birthDateFrom) {
      this.filterBody.birthDateFrom = this.birthDateFrom;
    } else {
      this.filterBody.birthDateFrom = null;
    }
    if (this.birthDateTo) {
      this.filterBody.birthDateTo = this.birthDateTo;
    } else {
      this.filterBody.birthDateTo = null;
    }

    // this.localStorageService.set('lastSearchedParams', this.filterBody);

    this.busy = this.personsService.filter(this.filterBody).subscribe(data => {
      this.loadData(data);
    });
  }

  refresh(page) {
    this.filterBody.firstResult = (page - 1) * this.filterBody.maxResult;
    this.busy = this.personsService.filter(this.filterBody).subscribe(data => {
      this.loadData(data);
      this.p = page;
    });
  }

  loadData(data) {
    this.resultData = data.result;
    this.total = data.count;

    this.personPhotos = [];
    this.customPlainGalleryRowConfig = {
      strategy: PlainGalleryStrategy.CUSTOM,
      layout: new AdvancedLayout(-1, true)
    };

    if (this.resultData && this.resultData.length > 0) {
      this.resultData.forEach((result, index) => {
        if (result.personId && result.personType) {
          this.personPhotos.push(new Image(index, {
            img: this.getPersonPhoto(result),
            description: result.firstName + ' ' + result.lastName + ' (' + result.personalNo + ')',
            alt: result.personId + '|' + result.personType
          }));
        }
      });
    }
    this.triggerFalseClick();
  }

  clearForm() {
    this.searchForm.reset();
    this.selectGender.active = [];
  }

  openPerson(person) {
    if (person) {
      this.globalService.openPerson(person, this.tabs, this.mainTabset, this.myDiv);
    } else {
      this.globalService.openPerson({
        personId: this.personId,
        personType: this.personType
      }, this.tabs, this.mainTabset, this.myDiv);
    }
  }

  removeTabHandler(tab: any): void {
    if (this.tabs.indexOf(tab) == 0) {
      const url = this.router.createUrlTree(['/persons']).toString();
      this.location.go(url);
    }
    this.tabs.splice(this.tabs.indexOf(tab), 1);
  }

  selectTabHandler(tab: any): void {
    this.globalService.createUrl(tab);
  }

  getSelected(data, value) {
    let selected = {};

    if (value) {
      data.forEach((item, index) => {
        if (item.id == value) {
          selected = item;
        }
      });
    }
    return selected;
  }

  loadPersonInTab(tab, loadedPerson, cb) {
    // tab.person = loadedPerson;
    tab.title = loadedPerson.firstName + ' ' + loadedPerson.lastName;
  }

  getPersonPhoto(data) {
    return this.personsService.getPersonPhoto(data.personalNo);
  }

  openImageModalRow(image: Image) {
    if (this.personPhotos && this.personPhotos.length > 0) {
      const index: number = this.getCurrentIndexCustomLayout(image, this.personPhotos);
      if (index >= 0) {
        this.customPlainGalleryRowConfig = Object.assign({}, this.customPlainGalleryRowConfig, {layout: new AdvancedLayout(index, true)});
      }
    }
  }

  getCurrentIndexCustomLayout(image: Image, images: Image[]): number {
    return image ? images.indexOf(image) : -1;
  }

  onCustomButtonBeforeHook(event: ButtonEvent) {
    if (!event || !event.button) {
      return;
    }

    if (event.button.type === ButtonType.CUSTOM) {
      const splitData = event.image.modal.alt.split('|');
      const tmpPerson = {
        personId: splitData[0],
        personType: splitData[1],
      };
      this.openPerson(tmpPerson);
      this.galleryService.closeGallery(52);
      return;
    }
  }

  openAddressModal() {
    this.modalAddresses.open();
  }

  triggerFalseClick() {
    let el: HTMLElement = this.myDiv.nativeElement as HTMLElement;
    el.click();
  }

  showTest() {
  }
}
