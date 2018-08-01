import { isDevMode } from '@angular/core';

export function getAPIBaseUrl(): string {
	return isDevMode() ? 'https://api.shop.djpcreative-com.staging.smplxs.com' : 'https://api.shop.djpcreative.com';
}
