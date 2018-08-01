import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { User } from './user';
import * as jwtDecode from 'jwt-decode';
import { _throw } from 'rxjs/observable/throw';
import { of } from 'rxjs/observable/of';
import { getAPIBaseUrl } from '../api';

@Injectable()
export class LoginService {

	private authTokenName = 'auth';
	private loginExpired = false;

	constructor(private http: HttpClient) {}

	isLoggedIn(): boolean {
		return localStorage.getItem(this.authTokenName) != null;
	}

	getAuthToken(): string {
		return localStorage.getItem(this.authTokenName);
	}

	logout(expired = false) {
		localStorage.removeItem(this.authTokenName);

		this.loginExpired = expired;
	}

	loggedOutFromExpire(): boolean {
		return this.loginExpired;
	}

	async login(token: string): Promise<boolean> {
		this.logout();

		const endpoint = `${getAPIBaseUrl()}/users/authenticate`;
		try {
			const result = await this.http.post<{user: User, jwt: string}>(endpoint, { token }).toPromise();
			this.storeJWT(result.jwt);
			return true;
		} catch (err) {
			if (err.status === 401) {
				return false;
			}

			console.error('An error occurred while trying to login.', err);
			return false;
		}
	}

	storeJWT(jwt: string) {
		localStorage.setItem(this.authTokenName, jwt);
	}

	async sendAuthToken(email: string): Promise<boolean> {
		const endpoint = `${getAPIBaseUrl()}/users/${email}/sendtoken`;
		try {
			return await this.http.get(endpoint, { responseType: 'text' })
				.pipe(
					map(result => true),
					catchError(error => {
						if (error.status === 404) {
							return of(false);
						}

						return _throw(error);
					})
				).toPromise();
		} catch (err) {
			console.error('There was an error sending the auth token.', err);
			return false;
		}
	}

	getHeaders(headers = {}) {
		if (this.isLoggedIn()) {
			headers['Authorization'] = `Bearer ${this.getAuthToken()}`;
		}

		return headers;
	}

	getUserEmail(): string {
		const payload = jwtDecode(this.getAuthToken());
		if (payload) {
			return payload['email'];
		}

		return null;
	}

}