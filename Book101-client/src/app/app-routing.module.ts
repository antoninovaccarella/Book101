import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AboutUsComponent} from './components/pages/about-us/about-us.component';
import {ContactComponent} from './components/pages/contact/contact.component';
import {MyAccountComponent} from './components/pages/my-account/my-account.component';
import {ErrorPageComponent} from './components/pages/error-page/error-page.component';
import {HomeComponent} from './components/pages/home/home.component';
import {ProductsComponent} from './components/pages/products/products.component';
import {ProductDetailsComponent} from './components/pages/product-details/product-details.component';
import {LoginRegisterComponent} from './components/pages/login-register/login-register.component';
import {StepperComponent} from './components/pages/stepper/stepper.component';
import { MyOrdersComponent } from './components/pages/my-orders/my-orders.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: 'about',
    component: AboutUsComponent,
    runGuardsAndResolvers: 'always',
  }, {
    path: 'checkout',
    component: StepperComponent,
    runGuardsAndResolvers: 'always',
  },

  {
    path: 'myorders',
    component: MyOrdersComponent,
    runGuardsAndResolvers: 'always',
  },

  {
    path: 'shop/:category',
    component: ProductsComponent,
    runGuardsAndResolvers: 'always',
  },


  {
    path: 'search/:name',
    component: ProductsComponent,
    runGuardsAndResolvers: 'always',
  },

  {
    path: 'shop',
    component: ProductsComponent,
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'shop/product/:id',
    component: ProductDetailsComponent,
    runGuardsAndResolvers: 'always'
  },
  {path: 'contact', component: ContactComponent},
  {path: 'join', component: LoginRegisterComponent},
  {path: 'my-account', component: MyAccountComponent},
  {
    path: 'error',
    component: ErrorPageComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    runGuardsAndResolvers: 'always'
  },
  //  { path: 'products/:category', component: ProductLeftSidebarComponent },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
