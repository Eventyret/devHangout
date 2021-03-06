import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth/auth.service";
import { Router } from "@angular/router";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NotificationsService } from "angular2-notifications";
import { User } from "../../models/users.model";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
	public invalidLogin: boolean;

	/**
	 * Creates an instance of login component.
	 * @param router  Used to navigate the user to the dashboard on success
	 * @param authService Authenticating the user
	 * @param activeModal The instance of this modal
	 */
	constructor(private router: Router, private authService: AuthService, public activeModal: NgbActiveModal) {}

		/**
	 * The Form the user submits when logging in.
	 */
	public loginForm = new FormGroup({
		username: new FormControl("", Validators.required),
		password: new FormControl("", Validators.required)
	});

	ngOnInit() {}

	/**
	 * Takes the form data and sends it off to the backend
	 * if we get a result we know the user has logged in and
	 * we redirect them to the dashboard
	 * @param credentials  The users credentials from the form
	 */
	public signIn(credentials: User) {
		this.authService.login(credentials).subscribe(
			results => {
				if (results) {
					this.activeModal.dismiss();
					this.router.navigate(["/dashboard"]);
				} else {
					this.invalidLogin = true;
				}
			},
			error => {
				console.log(error);
			}
		);
	}

	/**
	 * Gets username field
	 */
	get usernameField() {
		return this.loginForm.get("username");
	}
}
