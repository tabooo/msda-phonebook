import {Component, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs/Rx';
import {UsersService} from '../../../services/users.service';
import {BsModalComponent} from 'ng2-bs3-modal';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  busy: Subscription;
  busyModal: Subscription;
  busyModalUser: Subscription;
  busyModalUserChangePassword: Subscription;
  users;
  p = 1;
  total: number;

  filterBody = {
    firstResult: 0,
    maxResult: 15,
    userName: '',
  };

  currentUser = {
    userId: null,
    userName: null,
    password: null,
    personalNo: null,
    fullName: null,
    adress: null,
    email: null,
    phone: null,
    userStateId: null,
  };

  editUser = {
    userId: null,
    userName: null,
    password: null,
    personalNo: null,
    fullName: null,
    adress: null,
    email: null,
    phone: null,
    userStateId: null,
  };

  newPassword;

  uerRightObject = {
    otherRights: [],
    userRights: []
  };

  @ViewChild('modal')
  modal: BsModalComponent;

  @ViewChild('modalUser')
  modalUser: BsModalComponent;

  @ViewChild('modalUserChangePassword')
  modalUserChangePassword: BsModalComponent;

  constructor(private usersService: UsersService) {
  }

  ngOnInit() {
    this.search();
  }

  search() {
    this.busy = this.usersService.filter(this.filterBody).subscribe(data => {
      this.users = data;
    });
  }

  openUserRightsModal(user) {
    this.currentUser = user;
    this.reloadUserRightObject(user);
    this.modal.open();
  }

  removeRight(right) {
    this.busyModal = this.usersService.removeUserRight(this.currentUser.userId, right.rightId).subscribe(data => {
      this.reloadUserRightObject(this.currentUser);
    });
  }

  addRight(right) {
    this.busyModal = this.usersService.addUserRight(this.currentUser.userId, right.rightId).subscribe(data => {
      this.reloadUserRightObject(this.currentUser);
    });
  }

  reloadUserRightObject(user) {
    this.busyModal = this.usersService.getUserRightObject(user.userId).subscribe(data => {
      this.uerRightObject = data;
    });
  }

  openUserForm(user) {
    if (user) {
      this.editUser = Object.assign({}, user);
    } else {
      this.editUser = {
        userId: null,
        userName: null,
        password: null,
        personalNo: null,
        fullName: null,
        adress: null,
        email: null,
        phone: null,
        userStateId: null,
      };
    }

    this.modalUser.open();
  }

  saveUser() {
    this.busyModalUser = this.usersService.addUser(this.editUser).subscribe(data => {
      if (data.valid) {
        this.search();
        this.modalUser.close();
      } else {
        console.log(data.description);
      }
    });
  }

  deleteUser(user) {
    this.busy = this.usersService.deleteUser(user.userId).subscribe(data => {
      if (data.valid) {
        this.search();
      } else {
        console.log(data.description);
      }
    });
  }

  saveUserPassword() {
    this.busyModalUserChangePassword = this.usersService.saveUserPassword({
      newPassword: this.newPassword,
      userId: this.editUser.userId
    }).subscribe(data => {
      if (data.valid) {
        this.newPassword = '';
        this.modalUserChangePassword.close();
      } else {
        console.log(data.description);
      }
    });
  }
}
