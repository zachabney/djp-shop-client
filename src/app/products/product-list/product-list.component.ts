import { Component, Input } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
	selector: 'app-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
	@Input() products: Product[] = [];
	@Input() year: number;

	constructor(private productService: ProductService) {}

	toDollars(cents: number): string {
		return this.productService.toDollars(cents);
	}
}
