import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../products/product.service';
import { Product } from '../products/product';

@Component({
	selector: 'app-product-alias',
	templateUrl: './product-alias.component.html',
	styleUrls: ['./product-alias.component.scss']
})
export class ProductAliasComponent implements OnInit {

	alias = '';
	products: Product[] = [];

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private productService: ProductService
	) { }

	async ngOnInit() {
		this.route.url.subscribe(async url => {
			if (url.length === 1) {
				const alias = url[0].path;

				const products = await this.productService.getProductsByAlias(alias);

				if (products.length > 0) {
					this.products = products;
					return;
				}
			}

			this.router.navigate(['/']);
		});
	}

}
