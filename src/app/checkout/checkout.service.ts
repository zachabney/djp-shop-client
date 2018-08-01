import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CheckoutForm } from './checkout-form';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { Product } from '../products/product';
import { LoginService } from '../login/login.service';
import { getAPIBaseUrl } from '../api';

@Injectable()
export class CheckoutService {

	lastPurchasedProducts: Product[] = [];

	constructor(
		private http: HttpClient,
		private loginService: LoginService
	) {}

	public async getCountryList(): Promise<{name: string, code: string}[]> {
		const endpoint = `${getAPIBaseUrl()}/checkout/countries`;
		return await this.http.get<{name: string, code: string}[]>(endpoint).toPromise();
	}

	public async getStateList(countryCode: string): Promise<string[]> {
		const endpoint = `${getAPIBaseUrl()}/checkout/countries/${countryCode}/states`;
		return await this.http.get<string[]>(endpoint).toPromise();
	}

	public async processCheckout(checkoutForm: CheckoutForm): Promise<{success: boolean, products?: Product[], jwt?: string, error?: any}> {
		const endpoint = `${getAPIBaseUrl()}/checkout`;
		const result = await this.http.post<{success: boolean, products?: Product[], jwt?: string, error?: any}>(endpoint, checkoutForm)
			.pipe(
				catchError(res => {
					if (res.status === 402) {
						return of(res.error);
					}

					if (res.status === 409 && res.error.error.type === 'owned') {
						return of(res.error);
					}

					return _throw(res);
				})
			).toPromise();

		if (result.success) {
			if (result.products) {
				this.lastPurchasedProducts = result.products;
			}

			if (result.jwt) {
				this.loginService.storeJWT(result.jwt);
			}
		}

		return result;
	}

	public getLastPurchasedProducts(): Product[] {
		return this.lastPurchasedProducts;
	}

}