import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CheckoutComponent} from './checkout/checkout.component';
import {ProductDetailsComponent} from './common/product-details/product-details.component';
import {MyAccountComponent} from './my-account/my-account.component';
import {AuthComponent} from './auth/auth.component';
import {TermsAndConditionsComponent} from './terms-and-conditions/terms-and-conditions.component';
import {PolicyComponent} from './policy/policy.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'admin',
    component: DashboardComponent,
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
  },
  {
    path: 'product-details/:id',
    component: ProductDetailsComponent
  },
  {
    path: 'my-account',
    component: MyAccountComponent,
  },
  {
    path: 'terms-and-conditions',
    component: TermsAndConditionsComponent,
  },
  {
    path: 'policy',
    component: PolicyComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  }
];
