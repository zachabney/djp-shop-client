import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './product';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-products',
	templateUrl: './products.component.html',
	styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
	products: Product[] = [];
	productsLoadError = false;

	constructor(
		private productService: ProductService,
		private route: ActivatedRoute
	) {}

	async ngOnInit() {
		await this.getProducts();
	}

	private async getProducts() {
		try {
			this.products = await this.productService.getProducts();
		} catch (error) {
			console.error(error);
			this.productsLoadError = true;
		}
	}
}
