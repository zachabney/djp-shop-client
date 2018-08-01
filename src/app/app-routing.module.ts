import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CheckoutSuccessComponent } from './checkout-success/checkout-success.component';
import { UserDownloadsComponent } from './user-downloads/user-downloads.component';
import { LoginComponent } from './login/login.component';
import { AuthenticateComponent } from './login/authenticate/authenticate.component';
import { AuthGuard } from './login/auth-guard.service';
import { ProductAliasComponent } from './product-alias/product-alias.component';

const routes: Routes = [
	{ path: 'graduations', component: ProductsComponent },
	{ path: 'checkout/success', component: CheckoutSuccessComponent },
	{ path: 'checkout/:id', component: CheckoutComponent },
	{ path: 'downloads', canActivate: [AuthGuard], component: UserDownloadsComponent },
	{ path: 'login/:token', component: AuthenticateComponent },
	{ path: 'login', component: LoginComponent },
	{ path: '', redirectTo: '/graduations', pathMatch: 'full' },
	{ path: '**', component: ProductAliasComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ],
	providers: [ AuthGuard ]
})
export class AppRoutingModule { }
