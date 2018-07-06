import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map } from "rxjs/operators";
import "rxjs/add/operator/catch";
import { Token } from "../../models/token";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";

@Injectable({
	providedIn: "root"
})
export class AuthService {
	currentUser: any;
	helper = new JwtHelperService();

	constructor(private http: HttpClient, public jwtHelper: JwtHelperService, public router: Router) {
		const token = localStorage.getItem("access");
		if (token) {
			this.currentUser = this.helper.decodeToken(token);
		}
		console.log
	}
	login(credentials) {
		return this.http.post<Token>("http://localhost:8000/api/token/", credentials).pipe(
			map(response => {
				const result = response;

				if (result && result.access) {
					localStorage.setItem("token", result.access);
					this.currentUser = this.helper.decodeToken(localStorage.getItem("token"));
					return true;
				} else {
					return false;
				}
			})
		);
	}
	logout() {
		this.router.navigate(["/"]);
		localStorage.removeItem("token");
		this.currentUser = null;
	}

	isLoggedIn() {
		return this.helper.decodeToken(localStorage.getItem("token"));
	}
}
