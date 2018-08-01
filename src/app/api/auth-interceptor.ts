import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { _throw } from 'rxjs/observable/throw';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	constructor(
		private loginService: LoginService,
		private router: Router
	) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(req)
			.pipe(
				catchError(res => {
					if (res.status === 401) {
						const errors: any[] = res.error.errors;

						if (errors.includes('expiredToken')) {
							this.loginService.logout(true);
							this.router.navigate(['/login']);
						}
					}

					return _throw(res);
				})
			);
	}

}