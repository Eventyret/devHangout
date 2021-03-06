import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth/auth.service";
import { Router } from "@angular/router";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { SignupComponent } from "../signup/signup.component";
import { User } from "../../models/users.model";
@Component({
	selector: "app-session-expired",
	templateUrl: "./session-expired.component.html",
	styleUrls: ["./session-expired.component.scss"]
})
export class SessionExpiredComponent implements OnInit {
	public invalidUser: boolean;
	public username: string;

	/**
	 * Creates an instance of session expired component.
	 * @param router  Navigating the user to the frontpage
	 * @param authService Handling the authentication of this user
	 * @param activeModal  The instance of this modal
	 * @param modalService Handling opening a new modal
	 */
	constructor(private router: Router, private authService: AuthService, public activeModal: NgbActiveModal, private modalService: NgbModal) {}

	/**
	 * The login form
	 */
	public loginForm = new FormGroup({
		username: new FormControl("", Validators.required),
		password: new FormControl("", Validators.required)
	});

	ngOnInit() {}

	/**
	 * Signs the user in.
	 *  If the login is successfull we will redirect the user
	 * to the front page and dismiss the modal
	 * @param credentials
	 * @fires Router Navigating the user to front page
	 */
	public signIn(credentials: User) {
		this.authService.login(credentials).subscribe(results => {
			if (results) {
				this.router.navigate(["/"]);
				this.activeModal.dismiss();
			} else {
				this.invalidUser = true;
			}
		});
	}

	/**
	 * If the user closes the modal
	 * we will redirect the user to the front page
	 * and notify the user
	 *
	 */
	public dismiss() {
		if (!this.username) {
			this.authService.notLoggedIn();
		} else {
			this.authService.sessionExpired();
		}
		this.activeModal.dismiss();
	}

	/**
	 * If the user wants to register or there
	 * has been an unknown error.
	 * We will open the SignupComponent and let the user register
	 *
	 */
	public register() {
		this.activeModal.dismiss();
		this.modalService.open(SignupComponent, {
			centered: true,
			size: "lg",
			backdrop: "static"
		});
	}

	/**
	 * Gets username field
	 */
	get usernameField() {
		return this.loginForm.get("username");
	}
}
