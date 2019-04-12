import {Component, OnInit, ViewChild} from '@angular/core';
import {UsersService} from '../../../services/users.service';
import {Subscription} from 'rxjs';
import {BsModalComponent} from 'ng2-bs3-modal';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  busy: Subscription;
  busyModalUserChangePassword: Subscription;

  @ViewChild('modalUserChangePassword')
  modalUserChangePassword: BsModalComponent;

  user;
  oldPassword;
  newPassword;
  newPassword2;

  constructor(private usersService: UsersService) {
  }

  ngOnInit() {
    this.getUserInfo();
  }

  getUserInfo() {
    this.busy = this.usersService.getUserInfo().subscribe(data => {
      this.user = data;
    });
  }

  saveUser() {
    this.user.password = null;
    this.busy = this.usersService.addUser(this.user).subscribe(data => {
      if (data.valid) {

      } else {
        console.log(data.description);
      }
    });
  }

  saveUserPassword() {
    if (!this.oldPassword || !this.newPassword || !this.newPassword2) {
      return;
    }

    this.busyModalUserChangePassword = this.usersService.saveMyPassword({
      oldPassword: this.oldPassword,
      newPassword: this.newPassword,
      newPassword2: this.newPassword2,
    }).subscribe(data => {
      if (data.valid) {
        this.oldPassword = '';
        this.newPassword = '';
        this.newPassword2 = '';
        this.modalUserChangePassword.close();
      } else {
        console.log(data.description);
      }
    });
  }
}
