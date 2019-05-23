import { Component, Input } from '@angular/core';
import { Product } from '../product';

@Component({
	selector: 'app-graduation-list',
	templateUrl: './graduation-list.component.html',
	styleUrls: ['./graduation-list.component.scss']
})
export class GraduationListComponent {
	isLoading = true;

	_products = {};
	_years = [];
	@Input()
	set products(products: Product[]) {
		this._products = products.reduce((accumulator, current) => {
			accumulator[current.year] = accumulator[current.year] || [];
			accumulator[current.year].push(current);
			return accumulator;
		}, {});

		this._years = Object.keys(this._products)
			.sort()
			.reverse();

		this.isLoading = false;
	}

	@Input() productsLoadError = false;
}
