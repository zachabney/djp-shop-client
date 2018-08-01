import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraduationListComponent } from './graduation-list.component';

describe('GraduationListComponent', () => {
	let component: GraduationListComponent;
	let fixture: ComponentFixture<GraduationListComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ GraduationListComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(GraduationListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
