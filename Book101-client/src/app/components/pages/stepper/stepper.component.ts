import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CartService} from '../../shared/services/cart.service';
import {CartItem} from '../../../models/cart-item';
import {Order} from '../../../models/order';
import {TokenService} from '../../shared/services/token.service';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent implements OnInit {
  shoppingCartItems: CartItem[];
  order: Order;
  totalAmount = 0;
  username: string;

  isSuccessful = false;

  isLinear = true;
  firstFormGroup: FormGroup;
  paymentMethods = ['Paypal', 'Carta di credito', 'Contanti alla consegna'];
  payEnums = ['PAYPAL', 'CREDIT_CARD', 'CASH'];
  selectedPayment = 0;

  constructor(private formBuilder: FormBuilder, private cartService: CartService, private tokenService: TokenService) {
  }

  ngOnInit(): void {
    this.cartService.getItems().subscribe(cart => this.shoppingCartItems = cart);
    this.cartService.getTotalOb().subscribe(t => this.totalAmount = t);
    this.order = new Order( undefined, '', '', '', '', 0);
    this.firstFormGroup = this.formBuilder.group({
      firstNameCtrl: ['', Validators.compose([Validators.required, Validators.max(20)])],
      lastNameCtrl: ['', Validators.compose([Validators.required, Validators.max(20)])],
      emailCtrl: ['', Validators.compose([Validators.required, Validators.email])],
      phoneCtrl: ['', Validators.required],
      stateCtrl: ['', Validators.required],
      cityCtrl: ['', Validators.required],
      zipcodeCtrl: ['', Validators.required],
      streetCtrl: ['', Validators.required],
      paymentMethodCtrl: ['0', Validators.required]
    });
  }

  removeFromCart(cartItem: CartItem): void {
    this.cartService.updateCart(cartItem.product, 0);
  }

  increment(cartItem: CartItem): void {
    cartItem.quantity++;
    this.cartService.updateCart(cartItem.product, cartItem.quantity);
  }

  decrement(cartItem: CartItem): void {
    cartItem.quantity--;
    this.cartService.updateCart(cartItem.product, cartItem.quantity);
  }

  onSubmit(): void {
    const form = this.firstFormGroup.value;
    this.order.shippingAddress = form.firstNameCtrl + ' ' + form.lastNameCtrl + ', '
      + form.streetCtrl + ', ' + form.zipcodeCtrl + ', ' + form.cityCtrl + ', ' + form.stateCtrl;
    this.order.email = form.emailCtrl;
    this.order.phone = form.phoneCtrl;
    this.selectedPayment = form.paymentMethodCtrl;
    this.order.paymentMethod = this.payEnums[this.selectedPayment];
  }

  purchaseOrder(): void {
    this.order.orderItems = this.shoppingCartItems;
    this.order.totalAmount = this.totalAmount;
    this.cartService.buyCart(this.order).subscribe(
      data => {
        this.isSuccessful = true;
        console.log(this.isSuccessful);
        window.location.href = '/order?successful=true';
      },
      err => {
        this.isSuccessful = false;
        console.log(this.isSuccessful);
        window.location.href = '/order?successful=false';
      }
    );
  }
}
