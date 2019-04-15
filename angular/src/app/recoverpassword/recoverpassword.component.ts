import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-recoverpassword',
  templateUrl: './recoverpassword.component.html',
  styleUrls: ['./recoverpassword.component.css']
})
export class RecoverpasswordComponent implements OnInit {
  email = '';
  theHtmlString = '';

  constructor(private auth: AuthService) {
  }

  ngOnInit() {
  }

  recoverPassword() {
    var request = {
      email: this.email
    };

    this.auth.recoverPassword(request).subscribe(data => {
      if (data.valid) {
        this.theHtmlString = data.description;
      } else {
        this.theHtmlString = '<p>' + data.description + '</p>';
      }
    }, error => {
      console.log(error);
    });
  }
}
