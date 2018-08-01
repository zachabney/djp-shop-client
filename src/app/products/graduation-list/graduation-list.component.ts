import { Component, Input } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-graduation-list',
	templateUrl: './graduation-list.component.html',
	styleUrls: ['./graduation-list.component.scss']
})
export class GraduationListComponent {

	@Input() products: Product[] = [];
	@Input() productsLoadError = false;

}
