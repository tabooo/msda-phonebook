import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userName = '';
  password = '';
  password2 = '';
  firstName = '';
  lastName = '';
  email = '';
  phone = '';
  theHtmlString = '';

  constructor(private auth: AuthService,
              private router: Router) {
  }

  ngOnInit() {
  }

  registerUser() {
    let request = {
      userName: this.userName,
      password: this.password,
      password2: this.password2,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone
    };

    this.auth.register(request).subscribe(data => {
      if (data.valid) {
        this.theHtmlString = '';
        this.router.navigate(['/login']);
      } else {
        this.theHtmlString = '<p>' + data.description + '</p>';
      }
    }, error => {
      console.log(error);
    });
  }
}
