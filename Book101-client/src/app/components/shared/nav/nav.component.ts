import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {CartItem} from '../../../models/cart-item';
import {CartService} from '../services/cart.service';
import {TokenService} from '../services/token.service';
import {Product} from '../../../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {
  shoppingCartItems: CartItem[];
  total = 0;
  querySearch = '';
  @Input() isLoggedIn: boolean;
  @Input() username: string;

  constructor(private cartService: CartService, private router: Router, private tokenService: TokenService) {}

  ngOnInit(): void {
    this.cartService.getItems().subscribe(cart => this.shoppingCartItems = cart);
    this.cartService.getTotalOb().subscribe(t => this.total = t);
  }

  removeFromCart(cartItem: CartItem): void {
    this.cartService.updateCart(cartItem.product, 0);
  }

  search(querySearch: string): void {
    this.router.navigateByUrl('/search/' + querySearch).then(() => window.location.reload());
  }

  logOut(): void {
    this.tokenService.removeToken();
    window.location.reload();
  }


}
