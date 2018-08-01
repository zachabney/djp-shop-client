import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../products/product';
import { ProductService } from '../products/product.service';
import { NgForm } from '@angular/forms';
import { CheckoutService } from './checkout.service';
import { CheckoutForm } from './checkout-form';
import { SpinnerState } from '../shared/success-spinner/success-spinner.component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { LoginService } from '../login/login.service';

enum CheckoutState {
	PRODUCT_LOADING, PRODUCT_LOAD_ERROR, READY, SUBMITTING, UNKNOWN_ERROR, PURCHASE_SUCCESS, ALREADY_PURCHASED
}

@Component({
	selector: 'app-checkout',
	templateUrl: './checkout.component.html',
	styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, AfterViewInit, OnDestroy {

	product: Product;

	@ViewChild('cardInfo') cardInfo: ElementRef;
	card: any;
	cardHandler = this.onCardStatusChange.bind(this);
	cardError: string;
	cardValid = false;

	countries: {name: string, code: string}[];
	states: string[];

	state = new BehaviorSubject<CheckoutState>(CheckoutState.PRODUCT_LOADING);

	form = new CheckoutForm();
	prefilledFields = [];

	cardProcessErrorMessage: string;

	spinnerState = SpinnerState.HIDDEN;
	CheckoutState = CheckoutState;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private productService: ProductService,
		private checkoutService: CheckoutService,
		private cd: ChangeDetectorRef,
		private loginService: LoginService
	) {}

	async ngOnInit() {
		this.bindSpinnerState();

		await this.getProduct();

		const redirected = await this.ownedRedirect();
		if (redirected) {
			return;
		}

		this.loggedInFields();

		this.cd.detectChanges();
		await this.getCountries();
	}

	ngAfterViewInit() {
		this.createStripeCardElement();
	}

	ngOnDestroy() {
		this.destroyStripeCardElement();
	}

	private async ownedRedirect(): Promise<boolean> {
		if (!this.loginService.isLoggedIn()) {
			return false;
		}

		if (await this.productService.ownsProduct(this.product)) {
			this.router.navigate(['/']);
			return true;
		}

		return false;
	}

	loggedInFields() {
		if (!this.loginService.isLoggedIn()) {
			return;
		}

		this.form.email = this.loginService.getUserEmail();
		this.prefilledFields.push('email');
	}

	private bindSpinnerState() {
		this.state.subscribe(state => {
			switch (state) {
				case CheckoutState.SUBMITTING:
					this.spinnerState = SpinnerState.WAITING;
					break;
				case CheckoutState.PURCHASE_SUCCESS:
					this.spinnerState = SpinnerState.SUCCESS;
					break;
				case CheckoutState.UNKNOWN_ERROR:
				case CheckoutState.ALREADY_PURCHASED:
					this.spinnerState = SpinnerState.FAILED;
					break;
				default:
					this.spinnerState = SpinnerState.HIDDEN;
					break;
			}
		});
	}

	private setState(state: CheckoutState) {
		this.state.next(state);
	}

	private async getProduct() {
		this.setState(CheckoutState.PRODUCT_LOADING);
		const id = +this.route.snapshot.paramMap.get('id');
		try {
			this.product = await this.productService.getProduct(id);
		} catch (error) {
			this.setState(CheckoutState.PRODUCT_LOAD_ERROR);
			return;
		}

		if (this.product == null) {
			return this.router.navigate(['/graduations']);
		}
		this.form.productIds = [id];
		this.setState(CheckoutState.READY);
	}

	private async getCountries() {
		this.countries = await this.checkoutService.getCountryList();
	}

	private createStripeCardElement() {
		this.card = elements.create('card', {
			hidePostalCode: true,
			style: {
				base: {
					fontSize: '16px'
				}
			}
		});
		this.card.mount(this.cardInfo.nativeElement);

		this.card.addEventListener('change', this.cardHandler);
	}

	private destroyStripeCardElement() {
		this.card.removeEventListener('change', this.cardHandler);
		this.card.destroy();
	}

	private onCardStatusChange({ error, complete }) {
		this.cardValid = complete;

		if (error) {
			this.cardError = error.message;
		} else {
			this.cardError = null;
		}

		this.cd.detectChanges();
	}

	async selectCountry(country) {
		const countryCode = country.value;
		this.states = await this.checkoutService.getStateList(countryCode);
	}

	async onSubmit(form: NgForm) {
		this.setState(CheckoutState.SUBMITTING);
		this.clearCardProcessErrors();

		const { token, error } = await this.generateStripeToken();

		if (error) {
			this.setUnknownError(error);
		} else {
			this.form.stripeToken = token;
			try {
				const result = await this.checkoutService.processCheckout(this.form);
				if (result.success) {
					this.onSuccessfulPurchase(result);
					return;
				} else if (result.error.type === 'owned') {
					this.setAlreadyPurchasedError();
				} else {
					this.setCardProcessingError(result.error.message);
				}
			} catch (error) {
				this.setUnknownError(error);
			}
		}
	}

	private async generateStripeToken(): Promise<{ token: any, error: any }> {
		const { token, error } = await stripe.createToken(this.card, {
			name: this.form.firstName + ' ' + this.form.lastName,
			address_line1: this.form.address1,
			address_line2: this.form.address2,
			address_state: this.form.state,
			address_zip: this.form.zip,
			address_country: this.form.countryCode,
			currency: 'usd'
		});

		return { token, error };
	}

	onSuccessfulPurchase(result: any) {
		this.setState(CheckoutState.PURCHASE_SUCCESS);

		setTimeout(() => {
			this.router.navigate(['/checkout/success']);
		}, 2000);
	}

	setCardProcessingError(error: string) {
		this.cardProcessErrorMessage = error;
		this.setState(CheckoutState.READY);
	}

	setUnknownError(error?: any) {
		console.error(error);
		this.setState(CheckoutState.UNKNOWN_ERROR);
	}

	setAlreadyPurchasedError() {
		this.setState(CheckoutState.ALREADY_PURCHASED);
	}

	hasAlreadyPurchasedError() {
		return this.state.getValue() === CheckoutState.ALREADY_PURCHASED;
	}

	isLoading() {
		return this.state.getValue() === CheckoutState.PRODUCT_LOADING;
	}

	hasLoadError() {
		return this.state.getValue() === CheckoutState.PRODUCT_LOAD_ERROR;
	}

	isProductReady() {
		return !this.isLoading() && !this.hasLoadError();
	}

	hasUnknownError() {
		return this.state.getValue() === CheckoutState.UNKNOWN_ERROR;
	}

	clearCardProcessErrors() {
		this.cardProcessErrorMessage = null;
	}

	hasCardProcessError() {
		return this.cardProcessErrorMessage != null;
	}

	isAcceptingInput() {
		return this.state.getValue() === CheckoutState.READY;
	}

	isPurchaseSuccessful() {
		return this.state.getValue() === CheckoutState.PURCHASE_SUCCESS;
	}

	getSubtotal(): number {
		return this.product.price;
	}

	getSalesTax(): number {
		return this.product.price * 0.0825;
	}

	getTotal(): number {
		const subtotal = this.getSubtotal();
		const taxCollected = this.getSalesTax();
		const total = subtotal + taxCollected;
		return total;
	}

	toDollars(cents: number): string {
		return this.productService.toDollars(cents);
	}

}
