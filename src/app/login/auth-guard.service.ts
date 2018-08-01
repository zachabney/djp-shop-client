import { CanActivate, Router } from '@angular/router';
import { LoginService } from './login.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(
		private loginService: LoginService,
		private router: Router,
	) {}

	canActivate() {
		const loggedIn = this.loginService.isLoggedIn();
		if (!loggedIn) {
			this.router.navigate(['/login']);
			return false;
		}

		return true;
	}

}