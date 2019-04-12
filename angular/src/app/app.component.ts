import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor() {

    if (window.document.location.hostname == 'portal.mia.gov.ge') {
      window.document.getElementById('appFavIcon').setAttribute('href', 'favicon_mia.ico');
    }
  }
}
