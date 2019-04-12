import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authUser;

  constructor(private auth: AuthService, private router: Router, private api: ApiService) {
  }

  ngOnInit() {
    this.authUser = this.api.authUser;
  }

  logout() {
    this.auth.logout().toPromise().then(data => {
      if (data.valid) {
        this.router.navigate(['/login']);
      } else {
        //window.location.href = '/login';
      }
    }, error => {
      console.log(error);
    });
  }

  openProfilePage() {
    this.router.navigate(['/profile']);
  }
}
