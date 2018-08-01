import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessSpinnerComponent, SpinnerState } from './success-spinner.component';

describe('SuccessSpinnerComponent', () => {
	let component: SuccessSpinnerComponent;
	let fixture: ComponentFixture<SuccessSpinnerComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ SuccessSpinnerComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SuccessSpinnerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should be created', () => {
		expect(component).toBeTruthy();
	});

	describe('#setWaiting', () => {
		it('should set the state to waiting', () => {
			component.state = SpinnerState.SUCCESS;
			component.setWaiting();

			expect(component.state).toBe(SpinnerState.WAITING);
		});

		it('should emit on stateChange', done => {
			component.stateChange.subscribe(value => {
				expect(value).toBe(SpinnerState.WAITING);
				done();
			});

			component.setWaiting();
		});
	});

	describe('#setSuccess', () => {
		it('should set the state to success', () => {
			component.setSuccess();

			expect(component.state).toBe(SpinnerState.SUCCESS);
		});

		it('should emit on stateChange', done => {
			component.stateChange.subscribe(value => {
				expect(value).toBe(SpinnerState.SUCCESS);
				done();
			});

			component.setSuccess();
		});
	});

	describe('#setFailed', () => {
		it('should set the state to failed', () => {
			component.setFailed();

			expect(component.state).toBe(SpinnerState.FAILED);
		});

		it('should emit on stateChange', done => {
			component.stateChange.subscribe(value => {
				expect(value).toBe(SpinnerState.FAILED);
				done();
			});

			component.setFailed();
		});
	});
});
