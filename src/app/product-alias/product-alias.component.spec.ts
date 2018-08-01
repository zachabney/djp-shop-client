import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAliasComponent } from './product-alias.component';

describe('ProductAliasComponent', () => {
	let component: ProductAliasComponent;
	let fixture: ComponentFixture<ProductAliasComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ProductAliasComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ProductAliasComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
