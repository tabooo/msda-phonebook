import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from 'angular-2-local-storage';
import {GlobalService} from '../../services/global.service';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  activeMenu;

  constructor(private localStorageService: LocalStorageService, private globalService: GlobalService,
              private apiService: ApiService) {
  }

  ngOnInit() {
    this.globalService.activeMenu = this.localStorageService.get('activeMenu');
    this.activeMenu = this.localStorageService.get('activeMenu');

  }

  setActiveMenu(val) {
    this.localStorageService.set('activeMenu', val);
    this.globalService.activeMenu = val;
    this.activeMenu = val;
  }

  hasPermissions(perm) {
    return this.apiService.HasPermissions(perm);
  }
}
