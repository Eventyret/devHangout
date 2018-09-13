import { Component, OnInit, Input } from '@angular/core';
import { User } from "../../../shared/models/users.model";

@Component({
  selector: 'donations-mobile-view',
  templateUrl: './donations-mobile-view.component.html',
  styleUrls: ['./donations-mobile-view.component.scss']
})
export class DonationsMobileViewComponent implements OnInit {
	@Input() user: User;

  constructor() { }

  ngOnInit() {
  }

}
