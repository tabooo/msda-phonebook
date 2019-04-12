import {
  Component,
  ComponentFactoryResolver,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {PersonsService} from '../../../services/persons.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Rx';
import {BsModalComponent} from 'ng2-bs3-modal';
import {
  AdvancedLayout, ButtonEvent,
  ButtonsConfig, ButtonsStrategy, ButtonType, GalleryService,
  Image,
  PlainGalleryConfig,
  PlainGalleryStrategy
} from '@ks89/angular-modal-gallery';
import {DomSanitizer} from '@angular/platform-browser';
import {DatePipe} from '@angular/common';
import {GlobalService} from '../../../services/global.service';
import {PersonsSearchModalComponent} from '../persons/persons-search-modal/persons-search-modal.component';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  @ViewChild('showButton') myDiv: ElementRef;

  busy: Subscription;
  busyPhotos: Subscription;
  busyProtocol: Subscription;
  @Input() personId;
  @Input() personType;
  @Input() tabs;
  @Input() mainTabset;
  @Input() curTab;

  driverLicence;
  protocols;
  vehicles;
  personsWeaponxes;
  personCrosses: Array<any> = [];
  marriageActs: Array<any> = [];
  witnessActs: Array<any> = [];
  adoptionAct: Array<any> = [];
  deathActs: Array<any> = [];
  birthActs: Array<any> = [];
  parents: Array<any> = [];
  childrens: Array<any> = [];
  divorceActs: Array<any> = [];
  fatherhoodActs: Array<any> = [];
  siblingActs: Array<any> = [];
  structureRelatives: Array<any> = [];
  personRelatives: Array<any> = [];
  crimeFacts: Array<any> = [];
  likelyAdoptionActs: Array<any> = [];
  likelyDeathActs: Array<any> = [];
  likelyDivorceActs: Array<any> = [];
  likelyFatherhoodActs: Array<any> = [];
  likelyBirthAct: Array<any> = [];
  likelyMarriageActs: Array<any> = [];
  likelySiblingActs: Array<any> = [];
  isWanted;
  person = {
    address: null,
    addressFact: null,
    addressMainId: null,
    appdId: null,
    birthDate: null,
    birthPlace: null,
    children: null,
    citizenship: null,
    citizenship2: null,
    citizenship2Id: null,
    citizenshipId: null,
    citizenshipIdSecondary: null,
    condition: null,
    documentDate: null,
    firstName: null,
    gender: null,
    lastName: null,
    mdId: null,
    middName: null,
    parents: null,
    personDocument: [],
    personId: null,
    personType: null,
    personalNo: null,
    pnoId: null,
    regDate: null,
    siblings: null,
    spouses: null,
    status: null,
    statusId: null,
  };
  phones = [];
  personPhotos: Image[] = [];
  @ViewChild('modal')
  modal: BsModalComponent;
  modalBody;
  modalCssClass = 'modal-xl';
  @ViewChild('modalCar') modalCar: BsModalComponent;
  @ViewChild('carDetail', {read: ViewContainerRef}) carDetail;
  @ViewChild('modalDocument') modalDocument: BsModalComponent;
  curDocument;
  curCrimeFact;
  @ViewChild('modalCrimeFact') modalCrimeFact: BsModalComponent;
  @ViewChild('modalSearchPerson') modalSearchPerson: BsModalComponent;
  @ViewChild('searchpersonBody', {read: ViewContainerRef}) searchpersonBody;
  @ViewChild('modalWitness') modalWitness: BsModalComponent;
  @ViewChild('modalProtocolEvents') modalProtocolEvents: BsModalComponent;
  currentWitness = null;
  protocolEvents = [];

  filterBody = {
    personId: '',
    personType: '',
  };
  actsParams = {
    personalNo: null
  };
  personRelativesParams = {
    personId: null
  };

  crossesPage = 1;
  crossesTotal: number;
  crossFilterBody = {
    firstResult: 0,
    maxResult: 15,
    person: {
      firstNameEn: null,
      firstNameGe: null,
      lastNameEn: null,
      lastNameGe: null,
      birthDateFrom: null,
      birthDateTo: null,
      personalNumber: null,
      genderId: null,
      countryId: null,
    },
    documentNumber: null,
    documentTypeId: null
  };
  crossLibs = 4;
  crossLibsLoaded = false;

  crossLibraries = {
    genders: [],
    directions: [],
    divisions: [],
    crossStates: [],
    carColors: []
  };

  actsLoaded = false;
  likelyActsLoaded = false;
  crimeFactsLoaded = false;
  carsLoaded = false;
  carcCount = null;
  personRelativesCount = null;
  personRelativesLoaded = false;
  actsCount = null;
  likelyActsCount = null;
  crimeFactsCount = null;

  personAutosShow = false;
  personCrossShow = false;
  personActsShow = false;
  personLikelyActsShow = false;
  personRelativesShow = false;
  crimeFactsShow = false;


  relativePhotos: Image[] = [];
  customPlainGalleryRowConfig: PlainGalleryConfig = {
    strategy: PlainGalleryStrategy.CUSTOM,
    layout: new AdvancedLayout(-1, true)
  };
  customPlainGalleryRowConfigRelative: PlainGalleryConfig = {
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
              private activatedRoute: ActivatedRoute,
              private sanitizer: DomSanitizer,
              private datePipe: DatePipe,
              private resolver: ComponentFactoryResolver,
              private globalService: GlobalService,
              private galleryService: GalleryService) {
    // this.person = this.localStorageService.get('lastSearchedPerson');
  }

  ngOnInit() {
    if (!this.personId) {
      this.activatedRoute.params.subscribe(params => {
        this.personId = params['id'];
        this.personType = params['personType'];
      });
    }
    this.getPerson();
  }

  getPerson() {
    this.filterBody.personId = this.personId;
    this.filterBody.personType = this.personType;

    this.busy = this.personsService.getPersonDetails(this.filterBody).subscribe(data => {
      this.person = data;

      this.curTab.title = data.firstName + ' ' + data.lastName;

      if (data.personDocument && data.personDocument.length > 0) {
        data.personDocument.forEach((doc, index) => {
          if (doc.personalPhone && doc.personalPhone.trim() != '' && this.phones.indexOf(doc.personalPhone.trim()) < 0) {
            this.phones.push(doc.personalPhone.trim());
          }
        });
      }

      this.actsParams = {
        personalNo: this.person.personalNo
      };
      this.personRelativesParams = {
        personId: this.person.personId
      };


      this.personsService.getCheck('?birthDate=' + this.person.birthDate + '&firstName=' + this.person.firstName + '&lastName=' + this.person.lastName
        + '&personalNo=' + this.person.personalNo + '&opered=1').subscribe(checkBlackData => {
        this.isWanted = checkBlackData;
      });

      this.busyPhotos = this.personsService.getPersonPhotos({
        personId: this.personId,
        personalNo: this.person.personalNo
      }).subscribe(dataPhotos => {
        dataPhotos.forEach((photo, index) => {
          if (photo) {
            this.personPhotos.push(new Image(index, {
              img: this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + photo)
            }));
          }
        });
      });
    });

  }

  getPersonPhoto(data) {
    return this.personsService.getPersonPhoto(data.personalNo);
  }


  openPerson(person) {
    if (person.personId && person.personType) {
      this.globalService.openPerson(person, this.tabs, this.mainTabset, this.myDiv);
    } else {
      const filterBody = {
        personalNo: person.personalNo,
        firstName: person.firstName,
        lastName: person.lastName,
        birthDateFrom: person.birthDate,
        birthDateTo: person.birthDate
      };
      this.searchpersonBody.clear();
      const factory = this.resolver.resolveComponentFactory(PersonsSearchModalComponent);
      const compRef = this.searchpersonBody.createComponent(factory);
      compRef.instance.filterBody = filterBody;
      compRef.instance.tabs = this.tabs;
      compRef.instance.mainTabset = this.mainTabset;
      compRef.instance.thisModal = this.modalSearchPerson;
      compRef.instance.myDiv = this.myDiv;
    }
  }

  getPersonAutos() {
    if (this.personAutosShow) {
      this.personAutosShow = false;
      return;
    } else {
      this.personAutosShow = true;
    }

    if (this.actsParams.personalNo && !this.carsLoaded) {
      this.carcCount = 0;
      this.personsService.getPermitions({personId: this.personId}).subscribe(data => {
        this.driverLicence = data;
        if (data) {
          this.carcCount += data.length;
        }
        this.triggerFalseClick();
      });

      this.personsService.getPersonsAutos({personId: this.personId}).subscribe(data => {
        this.vehicles = data;
        if (data) {
          this.carcCount += data.length;
        }
        this.triggerFalseClick();
      });

      this.personsService.getPersonsProtocolxs({personId: this.personId}).subscribe(data => {
        this.protocols = data;
        if (data) {
          this.carcCount += data.length;
        }
        this.triggerFalseClick();
      });

      this.personsService.getPersonsWeaponx(this.actsParams).subscribe(data => {
        this.personsWeaponxes = data;
        if (data) {
          this.carcCount += data.length;
        }
        this.triggerFalseClick();
      });
    }
    this.carsLoaded = true;
  }

  getPersonActs() {
    if (this.personActsShow) {
      this.personActsShow = false;
      return;
    } else {
      this.personActsShow = true;
    }

    if (this.actsParams.personalNo && !this.actsLoaded) {
      this.actsCount = 0;

      if (this.person.spouses && this.person.spouses.length > 0) {
        this.marriageActs = this.person.spouses;
        this.actsCount += this.marriageActs.length;
      }

      /*this.personsService.getPersonMarryingActs(this.actsParams).subscribe(data => {
        this.marriageActs = data;
        if (data) {
          this.actsCount += data.length;
        }
        this.triggerFalseClick();
      });*/

      this.personsService.getPersonWitnessActs(this.actsParams).subscribe(data => {
        this.witnessActs = data;
        if (data) {
          this.actsCount += data.length;
        }
        this.triggerFalseClick();
      });

      if (this.person.parents && this.person.parents.length > 0) {
        this.parents = this.person.parents;
        this.actsCount += this.parents.length;
      }

      if (this.person.children && this.person.children.length > 0) {
        this.childrens = this.person.children;
        this.actsCount += this.childrens.length;
      }

      /*this.personsService.getBirthActs(this.actsParams).subscribe(data => {
        this.birthActs = data;
        if (data) {
          this.actsCount += data.length;
        }
        this.triggerFalseClick();
      });*/

      this.personsService.getAdoptionActs(this.actsParams).subscribe(data => {
        this.adoptionAct = data;
        if (data) {
          this.actsCount += data.length;
        }
        this.triggerFalseClick();
      });

      this.personsService.getDeathActs(this.actsParams).subscribe(data => {
        this.deathActs = data;
        if (data) {
          this.actsCount += data.length;
        }
        this.triggerFalseClick();
      });

      this.personsService.getDivorceActs(this.actsParams).subscribe(data => {
        this.divorceActs = data;
        if (data) {
          this.actsCount += data.length;
        }
        this.triggerFalseClick();
      });

      this.personsService.getFatherhoodActs(this.actsParams).subscribe(data => {
        this.fatherhoodActs = data;
        if (data) {
          this.actsCount += data.length;
        }
        this.triggerFalseClick();
      });

      this.personsService.getPersonStructureRelatives(this.actsParams).subscribe(data => {
        this.structureRelatives = data;
        if (data) {
          this.actsCount += data.length;
        }
        this.triggerFalseClick();
      });

      if (this.person.siblings && this.person.siblings.length > 0) {
        this.siblingActs = this.person.siblings;
        this.actsCount += this.siblingActs.length;
      }

      /*this.personsService.getSiblingActs(this.actsParams).subscribe(data => {
        this.siblingActs = data;
        if (data) {
          this.actsCount += data.length;
        }
        this.triggerFalseClick();
      });*/
    }
    this.actsLoaded = true;
  }

  getPersonLikelyActs() {
    if (this.personLikelyActsShow) {
      this.personLikelyActsShow = false;
      return;
    } else {
      this.personLikelyActsShow = true;
    }

    if (this.person.birthDate && this.person.firstName && this.person.lastName && !this.likelyActsLoaded) {
      this.likelyActsCount = 0;

      const paramString = '?birthDate=' + this.person.birthDate + '&firstName=' + this.person.firstName + '&lastName=' + this.person.lastName;

      this.personsService.getLikelyAdoptionActs(paramString).subscribe(data => {
        this.likelyAdoptionActs = data;
        if (data) {
          this.likelyActsCount += data.length;
        }
        this.triggerFalseClick();
      });

      this.personsService.getLikelyDeathActs(paramString).subscribe(data => {
        this.likelyDeathActs = data;
        if (data) {
          this.likelyActsCount += data.length;
        }
        this.triggerFalseClick();
      });

      this.personsService.getLikelyDivorceActs(paramString).subscribe(data => {
        this.likelyDivorceActs = data;
        if (data) {
          this.likelyActsCount += data.length;
        }
        this.triggerFalseClick();
      });

      this.personsService.getLikelyFatherhoodActs(paramString).subscribe(data => {
        this.likelyFatherhoodActs = data;
        if (data) {
          this.likelyActsCount += data.length;
        }
        this.triggerFalseClick();
      });

      this.personsService.getLikelyBirthActs(paramString).subscribe(data => {
        this.likelyBirthAct = data;
        if (data) {
          this.likelyActsCount += data.length;
        }
        this.triggerFalseClick();
      });

      this.personsService.getPersonLikelyMarryingActs(paramString).subscribe(data => {
        this.likelyMarriageActs = data;
        if (data) {
          this.likelyActsCount += data.length;
        }
        this.triggerFalseClick();
      });

      this.personsService.getLikelySiblingActs(paramString).subscribe(data => {
        this.likelySiblingActs = data;
        if (data) {
          this.likelyActsCount += data.length;
        }
        this.triggerFalseClick();
      });


    }
    this.likelyActsLoaded = true;
  }


  getPersonRelatives() {

    if (this.personRelativesShow) {
      this.personRelativesShow = false;
      return;
    } else {
      this.personRelativesShow = true;
    }

    if (this.personRelativesParams.personId && !this.personRelativesLoaded) {
      this.personRelativesCount = 0;

      this.relativePhotos = [];
      this.personsService.getPersonRelatives(this.personRelativesParams).subscribe(data => {
        this.personRelatives = data;
        if (data) {
          this.personRelativesCount += data.length;

          this.customPlainGalleryRowConfigRelative = {
            strategy: PlainGalleryStrategy.CUSTOM,
            layout: new AdvancedLayout(-1, true)
          };

          data.forEach((result, index) => {
            this.relativePhotos.push(new Image(index, {
              img: this.getPersonPhoto(result),
              description: result.firstName + ' ' + result.lastName + ' (' + result.personalNo + ')',
              alt: result.personId + '|' + result.personType
            }));
          });
        }
        this.triggerFalseClick();
      });

    }
    this.personRelativesLoaded = true;
  }

  getCrimeFacts() {
    if (this.crimeFactsShow) {
      this.crimeFactsShow = false;
      return;
    } else {
      this.crimeFactsShow = true;
    }

    if (this.actsParams.personalNo && !this.crimeFactsLoaded) {
      this.crimeFactsCount = 0;

      this.personsService.getPersonCrimeFacts(this.actsParams).subscribe(data => {
        this.crimeFacts = data;
        if (data) {
          this.crimeFactsCount += data.length;
        }
        this.triggerFalseClick();
      });

    }
    this.crimeFactsLoaded = true;
  }

  triggerFalseClick() {
    const el: HTMLElement = this.myDiv.nativeElement as HTMLElement;
    el.click();
  }

  openImageModalRow(image: Image) {
    if (this.personPhotos && this.personPhotos.length > 0) {
      const index: number = this.getCurrentIndexCustomLayout(image, this.personPhotos);
      if (index >= 0) {
        this.customPlainGalleryRowConfig = Object.assign({}, this.customPlainGalleryRowConfig, {layout: new AdvancedLayout(index, true)});
      }
    }
  }

  openImageModalRowRelatives(image: Image) {
    if (this.relativePhotos && this.relativePhotos.length > 0) {
      const index: number = this.getCurrentIndexCustomLayout(image, this.relativePhotos);
      if (index >= 0) {
        this.customPlainGalleryRowConfigRelative = Object.assign({}, this.customPlainGalleryRowConfigRelative, {layout: new AdvancedLayout(index, true)});
      }
    }
  }

  openCarDetail(car) {
    this.globalService.openCar({
      automobileId: car.regOwnershipId
    }, this.tabs, this.mainTabset, this.myDiv);
    /*const factory = this.resolver.resolveComponentFactory(CarModalComponent);
    const compRef = this.carDetail.createComponent(factory);
    compRef.instance.automobileId = car.automobileId;
    compRef.instance.modal = this.modalCar;
    this.modalCar.open();*/
  }

  closeCarDetail() {
    this.carDetail.clear();
  }

  openDocumentDetail(document) {
    this.curDocument = document;
    this.modalDocument.open();
  }

  openCrimeFact(crimeFact) {
    this.curCrimeFact = crimeFact;
    this.modalCrimeFact.open();
  }


  openAct(act) {
    this.modalBody = '<table width="100%">';

    let i = 0;
    for (const key in act) {
      if (i % 2 === 0) {
        this.modalBody += '<tr>';
      }
      const value = act[key];
      this.modalBody += '<td>' + key + '</td><td>' + (value ? (key.indexOf('Date') > -1 ? this.datePipe.transform(value, 'yyyy/MM/dd') : value) : '') + '</td>';
      if (i % 2 === 1) {
        this.modalBody += '</tr>';
      }
      i++;
    }

    this.modalBody += '</table>';
    this.modal.open();
  }

  openMarriageWitness(act) {
    this.currentWitness = null;
    if (act.craPersonMarriageWitness.length > 0) {
      this.currentWitness = act.craPersonMarriageWitness;
      this.modalWitness.open();
    }
  }

  getPersonCross() {
    if (this.personCrossShow) {
      this.personCrossShow = false;
      return;
    } else {
      this.personCrossShow = true;
    }

    this.crossFilterBody.firstResult = 0;
    this.crossesPage = 1;
    this.crossesTotal = 0;

    this.crossFilterBody.person.personalNumber = this.person.personalNo;

  }

  changeCrossesPaging(page) {
  }

  loadPersonCrossesData(data, page) {
    this.personCrosses = data.result;
    this.crossesTotal = data.totalCount;
    if (page) {
      this.crossesPage = page;
    }
    this.triggerFalseClick();
  }

  openCross(cross) {
    if (cross) {
      this.globalService.openCross(cross, (cross.crossId + (cross.serverId ? '-' + cross.serverId : '')), this.tabs, this.mainTabset, this.myDiv, this.crossLibraries);
    }
  }

  loadCrossLib(cb) {
    this.crossLibs--;
    if (this.crossLibs == 0) {
      this.crossLibsLoaded = true;
      cb();
    }
  }

  loadCrossLibs(cb) {
  }

  getLibName(val, valueField, nameField, lib) {
    let name = '';
    if (!val || !valueField || !nameField || !lib) {
      return name;
    }

    lib.forEach((item, index) => {
      if (item[valueField] === val) {
        name = item[nameField];
      }
    });
    return name;
  }

  openProtocolModal(protocol) {
    this.modalBody = '<table class="table table-hover table-bordered">' +
      '<tr>' +
      '<td>გამოვლენის თარიღი</td>' +
      '<td>' + this.datePipe.transform(protocol.protocolDate, 'yyyy/MM/dd') + '</td>' +
      '<td>ავტომანქანის მფლობელი</td>' +
      '<td>' + protocol.firstName + ' ' + protocol.lastName + '</td>' +
      '</tr>' +
      '</table>';
    this.modal.open();
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
      this.galleryService.closeGallery(53);
      return;
    }
  }

  showTest() {
    /*document.getElementById(event).style.display = 'block';*/
  }

  getMiddNameText(middName, genderId) {
    return this.globalService.getMiddNameText(middName, genderId);
  }

  getGenderName(genderId) {
    return this.globalService.getGenderName(genderId);
  }

  showProtocolEvents(protocol) {
  }
}
