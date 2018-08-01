import { Component, OnInit } from '@angular/core';
import { Product } from '../products/product';
import { ProductService } from '../products/product.service';

@Component({
	selector: 'app-user-downloads',
	templateUrl: './user-downloads.component.html',
	styleUrls: ['./user-downloads.component.scss']
})
export class UserDownloadsComponent implements OnInit {

	products: Product[] = [];

	constructor(
		private productService: ProductService
	) {}

	async ngOnInit() {
		await this.getProducts();
	}

	private async getProducts() {
		try {
			this.products = await this.productService.getPurchasedProducts();
		} catch (error) {
			console.error(error);
		}
	}

}
