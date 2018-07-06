import { EditProfileComponent } from "./profile/edit-profile/edit-profile.component";
import { EditExperienceComponent } from "./experience/edit-experience/edit-experience.component";
import { AddExperienceComponent } from "./experience/add-experience/add-experience.component";
import { EditEducationComponent } from "./education/edit-education/edit-education.component";
import { AddEducationComponent } from "./education/add-education/add-education.component";
import { Component, OnInit } from "@angular/core";
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";

import { Subscription } from "rxjs";

@Component({
	selector: "app-dashboard",
	templateUrl: "./dashboard.component.html",
	styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
	username = "Simen";
	comp;

	constructor(private modalService: NgbModal, private spinner: NgxSpinnerService) {}

	ngOnInit() {
		this.spinner.show();
		setTimeout(() => {
			this.spinner.hide();
		}, 1500);
	}
	open(event) {
		const target = event.target.id;
		if (target === "addEdu") {
			this.comp = AddEducationComponent;
		} else if (target === "addExp") {
			this.comp = AddExperienceComponent;
		} else if (target === "editEdu") {
			this.comp = EditEducationComponent;
		} else if (target === "editExp") {
			this.comp = EditExperienceComponent;
		} else if (target === "editProfile") {
			this.comp = EditProfileComponent;
		}
		const modalRef = this.modalService.open(this.comp, {
			centered: true,
			size: "lg",
			backdropClass: "light-blue-backdrop"
		});
		modalRef.componentInstance.name = this.username;
	}
}
