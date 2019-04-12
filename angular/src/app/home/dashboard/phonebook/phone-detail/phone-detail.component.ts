import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-phone-detail',
  templateUrl: './phone-detail.component.html',
  styleUrls: ['./phone-detail.component.css']
})
export class PhoneDetailComponent implements OnInit {
  @Input() phoneId;
  @Input() tabs;
  @Input() mainTabset;
  @Input() curTab;

  constructor() { }

  ngOnInit() {
  }

}
