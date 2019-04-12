import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from '../services/auth.service';
import {LocalStorageService} from "angular-2-local-storage";
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('userNameField') userNameField: ElementRef;
  @ViewChild('passwordField') passwordField: ElementRef;
  @ViewChild('loginButton') loginButton: ElementRef;
  mUsername = '';
  mPassword = '';
  theHtmlString = '';

  constructor(private auth: AuthService, private renderer: Renderer2,
              private apiService: ApiService, private localStorageService: LocalStorageService,
              private router: Router) {
  }

  ngAfterViewInit() {
    this.renderer.selectRootElement(this.userNameField['nativeElement']).focus();
  }

  ngOnInit() {
    if (window.document.location.hostname == 'portal.mia.gov.ge') {
      window.document.getElementById('loginBodyDiv').style.backgroundImage = 'url("../../assets/dist/img/logo_background.png")';
    }
  }

  onClickSubmit() {
    const user = {
      username: this.mUsername,
      password: this.mPassword
    };

    this.auth.login(user).subscribe(data => {
      if (data.valid) {
        this.theHtmlString = '';
        this.apiService.authUser = data;
        this.localStorageService.set('activeMenu', 'phonebook');
        this.router.navigate(['/phonebook']);
      } else {
        this.theHtmlString = '<p>' + data.description + '</p>';
        this.mPassword = '';
      }
    }, error => {
      console.log(error);
    });
  }
}
