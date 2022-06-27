import { NgModule } from '@angular/core';

import { ContactComponent } from './contact/contact.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyAccountComponent } from './my-account/my-account.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { AppRoutingModule } from '../../app-routing.module';
import { ProductDetailsComponent } from './product-details/product-details.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { LoginRegisterComponent } from './login-register/login-register.component';
import {MatCardModule} from '@angular/material/card';
import {MatPasswordStrengthModule} from '@angular-material-extensions/password-strength';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { StepperComponent } from './stepper/stepper.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatRadioModule} from '@angular/material/radio';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import {MatTableModule} from '@angular/material/table';


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatPasswordStrengthModule,
    MatIconModule,
    MatButtonModule,
    MatStepperModule,
    MatRadioModule,
    MatDividerModule,
    MatListModule,
    MatTableModule,
  ],
  declarations: [
    ContactComponent,
    MyAccountComponent,
    AboutUsComponent,
    ErrorPageComponent,
    HomeComponent,
    ProductsComponent,
    ProductDetailsComponent,
    LoginRegisterComponent,
    StepperComponent,
    MyOrdersComponent
  ],
  providers: []
})
export class PagesModule { }
