import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
	selector: 'app-authenticate',
	templateUrl: './authenticate.component.html',
	styleUrls: ['./authenticate.component.scss']
})
export class AuthenticateComponent implements OnInit {

	error = false;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private loginService: LoginService
	) {}

	async ngOnInit() {
		this.login();
	}

	async login() {
		const token = this.route.snapshot.paramMap.get('token');
		const success = await this.loginService.login(token);

		if (success) {
			this.router.navigate(['downloads']);
		} else {
			this.error = true;
		}
	}

}
