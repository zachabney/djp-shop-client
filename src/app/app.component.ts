import { Component } from '@angular/core';
import { LoginService } from './login/login.service';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from '../environments/environment';

declare var ga: Function;

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	stripeToken = environment.stripeToken;

	constructor(
		private loginService: LoginService,
		private router: Router
	) {
		this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				ga('set', 'page', event.urlAfterRedirects);
				ga('send', 'pageview');
			}
		});
	}

	isLoggedIn() {
		return this.loginService.isLoggedIn();
	}

	logout() {
		this.loginService.logout();
		this.router.navigate(['/']);
	}

}
