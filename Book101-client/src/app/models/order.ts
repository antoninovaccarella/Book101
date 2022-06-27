import {User} from './user';
import {CartItem} from './cart-item';

export class Order {
  orderItems: CartItem[];
  email: string;
  phone: string;
  shippingAddress: string;
  paymentMethod: string;
  totalAmount: number;

  constructor(
    orderItems: CartItem[],
    email: string,
    phone: string,
    shippingAddress: string,
    paymentMethod: string,
    totalAmount: number
  ) {
    this.orderItems = orderItems;
    this.email = email;
    this.phone = phone;
    this.shippingAddress = shippingAddress;
    this.paymentMethod = paymentMethod;
    this.totalAmount = totalAmount;
  }
}
