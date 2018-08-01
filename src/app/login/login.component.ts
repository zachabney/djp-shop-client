import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { NgForm } from '@angular/forms';
import { SpinnerState } from '../shared/success-spinner/success-spinner.component';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	email = '';
	submitting = false;
	success = false;
	noEmail = false;
	loggedOutFromExpire = false;
	formNeverSubmitted = true;

	spinnerState = SpinnerState.HIDDEN;

	constructor(
		private loginService: LoginService,
		private router: Router,
	) {}

	ngOnInit() {
		if (this.loginService.isLoggedIn()) {
			this.router.navigate(['/downloads']);
		}

		this.loggedOutFromExpire = this.loginService.loggedOutFromExpire();
	}

	async onSubmit(form: NgForm) {
		this.submitting = true;
		this.success = false;
		this.noEmail = false;
		this.formNeverSubmitted = false;

		const success = await this.loginService.sendAuthToken(this.email);
		if (success) {
			this.spinnerState = SpinnerState.SUCCESS;
			this.success = true;
		} else {
			this.spinnerState = SpinnerState.HIDDEN;
			this.success = false;
			this.noEmail = true;
			this.submitting = false;
		}
	}

}
