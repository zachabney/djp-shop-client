import { AuthInterceptor } from './auth-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

export const apiInterceptorProviders = [
	{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];