import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders: Order[];
  displayedColumns: string[] = ['purchaseTime', 'orderStatus', 'orderItems','paymentMethod', 'totalAmount'];  
  
  
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getOrders().subscribe(orders => this.orders = orders);
  }

}




