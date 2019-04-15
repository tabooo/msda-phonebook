import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {TabsetComponent} from 'ngx-bootstrap';
import {LocalStorageService} from 'angular-2-local-storage';

@Injectable()
export class GlobalService {
  location: Location;
  myGlobalVar;
  public activeMenu: string;
  carColors = [
    {
      name: 'თეთრი',
      hex: '#FFFFFF'
    }, {
      name: 'შავი',
      hex: '#000000'
    },
    {
      name: 'წითელი',
      hex: '#FF0000'
    },
    {
      name: 'რუხი',
      hex: '#808080'
    },
    {
      name: 'ყვითელი',
      hex: '#FFFF00'
    },
    {
      name: 'მეწამული',
      hex: '#A020F0'
    },
    {
      name: 'ყავისფერი',
      hex: '#A52A2A'
    },
    {
      name: 'ნარინჯისფერი',
      hex: '#FF681F'
    },
    {
      name: 'ვარდისფერი',
      hex: '#FFC0CB'
    },
    {
      name: 'ლურჯი',
      hex: '#0000FF'
    },
    {
      name: 'მწვანე',
      hex: '#00FF00'
    }
  ];

  genders = [
    {
      id: '1',
      text: 'მამრობითი'
    },
    {
      id: '2',
      text: 'მდედრობითი'
    }
  ];

  constructor(private router: Router,
              private locationService: Location,
              private localStorageService: LocalStorageService) {
    this.location = locationService;
    this.myGlobalVar = true;
    this.activeMenu = '';
  }

  setMyGV(val: boolean) {
    this.myGlobalVar = val;
  }

  getMyGV() {
    return this.myGlobalVar;
  }

  getCarColor(value) {
    let selected = '';

    if (value) {
      this.carColors.forEach((item, index) => {
        if (item.name == value) {
          selected = item.hex;
        }
      });
    }
    return selected;
  }

  getMiddNameText(middName, genderId) {
    let gender = '';
    if (middName != null) {
      if (genderId === 1) {
        gender = ' ძე';
      } else if (genderId === 2) {
        gender = ' ასული';
      } else {
        return middName;
      }
      const x = ['ა', 'ე', 'ი', 'ო', 'უ'];
      const last = middName.substring(middName.length - 1);
      if (x.indexOf(last) > -1) {
        middName += ('ს' + gender);
      } else {
        middName += ('ის' + gender);
      }
    }
    return middName;
  }

  triggerFalseClick(myDiv) {
    let el: HTMLElement = myDiv.nativeElement as HTMLElement;
    el.click();
  }

  createUrl(data) {
    if (data.person) {
      const url = this.router.createUrlTree(['/persons', data.personId, data.personType]).toString();
      this.location.go(url);
      this.localStorageService.set('activeMenu', 'persons');
    } else if (data.cross) {
      const url = this.router.createUrlTree(['/groups/', data.groupId]).toString();
      this.location.go(url);
      this.localStorageService.set('activeMenu', 'groups');
    }
  }

  deactivateotherTabs(tabs) {
    tabs.forEach((tab, index) => {
      tab.active = false;
    });
  }

  openGroup(group, tabs, mainTabset: TabsetComponent, myDiv) {
    let opened = -1;
    tabs.forEach((item, index) => {
      if (item.groupId === group.groupId) {
        opened = index;
      }
    });

    if (opened > -1) {
      mainTabset.tabs[opened + 1].active = true;
    } else {
      this.deactivateotherTabs(tabs);

      const tmpTab = {
        title: '',
        content: '',
        disabled: false,
        removable: true,
        active: true,
        groupId: group.groupId,
        group: group
      };

      tabs.push(tmpTab);
      this.createUrl(tmpTab);
      this.triggerFalseClick(myDiv);
    }
  }

  openPerson(person, tabs, mainTabset: TabsetComponent, myDiv) {
    let opened = -1;
    tabs.forEach((item, index) => {
      if (item.personId === person.personId) {
        opened = index;
      }
    });

    if (opened > -1) {
      mainTabset.tabs[opened + 1].active = true;
    } else {
      this.deactivateotherTabs(tabs);

      const tmpTab = {
        title: '',
        content: '',
        disabled: false,
        removable: true,
        active: true,
        personId: person.personId,
        personType: person.personType,
        person: person
      };

      tabs.push(tmpTab);
      this.createUrl(tmpTab);
      this.triggerFalseClick(myDiv);
    }
  }

  openCar(car, tabs, mainTabset: TabsetComponent, myDiv) {
    let opened = -1;
    tabs.forEach((item, index) => {
      if (item.automobileId === car.automobileId) {
        opened = index;
      }
    });

    if (opened > -1) {
      mainTabset.tabs[opened + 1].active = true;
    } else {
      this.deactivateotherTabs(tabs);

      const tmpTab = {
        title: '',
        content: '',
        disabled: false,
        removable: true,
        active: true,
        automobileId: car.automobileId,
        car: car
      };

      tabs.push(tmpTab);
      this.createUrl(tmpTab);
      this.triggerFalseClick(myDiv);
    }
  }

  getGenderName(genderId) {
    let name = '';
    this.genders.forEach((gender, index) => {
      if (gender.id == genderId) {
        name = gender.text;
      }
    });
    return name;
  }
}
