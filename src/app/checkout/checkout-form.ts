export class CheckoutForm {
	productIds: number[];
	firstName: string;
	lastName: string;
	email: string;
	address1: string;
	address2: string;
	countryCode = '';
	state = '';
	zip: string;
	stripeToken: any;
}