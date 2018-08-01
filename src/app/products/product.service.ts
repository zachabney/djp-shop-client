import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';
import { _throw } from 'rxjs/observable/throw';
import 'rxjs/add/operator/retry';
import { LoginService } from '../login/login.service';
import { CheckoutService } from '../checkout/checkout.service';
import { getAPIBaseUrl } from '../api';

@Injectable()
export class ProductService {

	constructor(
		private http: HttpClient,
		private loginService: LoginService,
		private checkoutService: CheckoutService) {}

	async getProducts(): Promise<Product[]> {
		const endpoint = `${getAPIBaseUrl()}/products`;
		return await this.http.get<Product[]>(endpoint, { headers: this.loginService.getHeaders() })
			.retry(3)
			.toPromise();
	}

	async getProduct(id: number): Promise<Product> {
		const endpoint = `${getAPIBaseUrl()}/products/${id}`;
		return await this.http.get<Product>(endpoint, { headers: this.loginService.getHeaders() })
			.retry(3)
			.pipe(
				catchError(error => {
					if (error.status === 404) {
						return of(null);
					}

					return _throw(error);
				})
			).toPromise();
	}

	async getPurchasedProducts(): Promise<Product[]> {
		const endpoint = `${getAPIBaseUrl()}/users/purchased`;
		const result = await this.http.get<Product[]>(endpoint, { headers: this.loginService.getHeaders() }).toPromise();

		if (result.length === 0) {
			return this.checkoutService.getLastPurchasedProducts();
		}

		return result;
	}

	async ownsProduct(product: Product) {
		const purchasedProductIds = (await this.getPurchasedProducts()).map(purchasedProduct => purchasedProduct.id);
		return purchasedProductIds.includes(product.id);
	}

	async getProductsByAlias(alias: string): Promise<Product[]> {
		const endpoint = `${getAPIBaseUrl()}/products/alias/${alias}`;
		const result = await this.http.get<Product[]>(endpoint, { headers: this.loginService.getHeaders() }).toPromise();

		return result;
	}

	toDollars(cents: number): string {
		return (cents / 100).toFixed(2);
	}

}