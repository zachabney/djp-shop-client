import { Component, Input, Output, EventEmitter } from '@angular/core';

export enum SpinnerState {
	WAITING = 0,
	SUCCESS = 1,
	FAILED = 2,
	HIDDEN = 3
}

@Component({
	selector: 'app-success-spinner',
	templateUrl: './success-spinner.component.html',
	styleUrls: ['./success-spinner.component.scss']
})
export class SuccessSpinnerComponent {

	@Input() state: SpinnerState = SpinnerState.HIDDEN;
	@Output() stateChange = new EventEmitter<SpinnerState>();
	@Input() size = '50px';

	SpinnerState = SpinnerState; // code smell, used to let template access enum members

	setWaiting() {
		this.state = SpinnerState.WAITING;
		this.stateChange.emit(this.state);
	}

	setSuccess() {
		this.state = SpinnerState.SUCCESS;
		this.stateChange.emit(this.state);
	}

	setFailed() {
		this.state = SpinnerState.FAILED;
		this.stateChange.emit(this.state);
	}

	setHidden() {
		this.state = SpinnerState.HIDDEN;
		this.stateChange.emit(this.state);
	}

}
