import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductsComponent } from './products/products.component';
import { ProductService } from './products/product.service';
import { AppRoutingModule } from './app-routing.module';
import { CheckoutService } from './checkout/checkout.service';
import { CheckoutSuccessComponent } from './checkout-success/checkout-success.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { SuccessSpinnerComponent } from './shared/success-spinner/success-spinner.component';
import { UserDownloadsComponent } from './user-downloads/user-downloads.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { AuthenticateComponent } from './login/authenticate/authenticate.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductAliasComponent } from './product-alias/product-alias.component';
import { GraduationListComponent } from './products/graduation-list/graduation-list.component';
import { apiInterceptorProviders } from './api/interceptors';

@NgModule({
	declarations: [
		AppComponent,
		CheckoutComponent,
		ProductsComponent,
		CheckoutSuccessComponent,
		SpinnerComponent,
		LoadingSpinnerComponent,
		SuccessSpinnerComponent,
		UserDownloadsComponent,
		LoginComponent,
		AuthenticateComponent,
		ProductListComponent,
		ProductAliasComponent,
		GraduationListComponent
	],
	imports: [BrowserModule, HttpClientModule, AppRoutingModule, FormsModule],
	providers: [
		ProductService,
		CheckoutService,
		LoginService,
		apiInterceptorProviders
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
