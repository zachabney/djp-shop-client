import { isDevMode } from '@angular/core';

export function getAPIBaseUrl(): string {
	return isDevMode()
		? 'http://localhost:3000'
		: 'https://api-shop.djpcreative.com';
}
