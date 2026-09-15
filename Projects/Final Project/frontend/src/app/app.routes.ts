import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './pages/menu/menu.component';
import { MenuDetailComponent } from './pages/menu/menu-detail.component';
import { SignInComponent } from './pages/auth/sign-in.component';
import { SignUpComponent } from './pages/auth/sign-up.component';
import { AccountComponent } from './pages/account/account.component';
import { AccountMenuComponent } from './pages/account/account-menu.component';
import { AccountOrdersComponent } from './pages/account/account-orders.component';
import { ProfileComponent } from './pages/account/profile.component';
import { AdminComponent } from './pages/admin/admin.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

export const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'menu', component: MenuComponent },
	{ path: 'menu/:id', component: MenuDetailComponent },
	{ path: 'sign-in', component: SignInComponent },
	{ path: 'sign-up', component: SignUpComponent },
	{ path: 'checkout', component: CheckoutComponent, canActivate: [authGuard] },
 	{ path: 'account', component: AccountComponent, canActivate: [authGuard], children: [{ path: '', pathMatch: 'full', redirectTo: 'profile' }, { path: 'profile', component: ProfileComponent }, { path: 'menu', component: AccountMenuComponent }, { path: 'orders', component: AccountOrdersComponent }] },
	{ path: 'admin', component: AdminComponent, canActivate: [adminGuard] },
	{ path: '**', redirectTo: '' },
];
