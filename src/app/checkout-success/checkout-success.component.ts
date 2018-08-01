import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../products/product';
import { CheckoutService } from '../checkout/checkout.service';

@Component({
	selector: 'app-checkout-success',
	templateUrl: './checkout-success.component.html',
	styleUrls: ['./checkout-success.component.scss']
})
export class CheckoutSuccessComponent implements OnInit {

	products: Product[] = [];

	constructor(private checkoutService: CheckoutService) {}

	ngOnInit() {
		this.products = this.checkoutService.getLastPurchasedProducts();
	}

	hasPreorder() {
		return this.products.some(product => product.preorder);
	}

}
