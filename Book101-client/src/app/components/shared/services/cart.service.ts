import {Injectable, NgZone} from '@angular/core';
import {Product} from 'src/app/models/product';
import {CartItem} from 'src/app/models/cart-item';
import {BehaviorSubject, Observable,} from 'rxjs';
import {ORDER_API, CART_API} from 'src/app/config/api';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TokenService} from './token.service';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {Order} from '../../../models/order';

const CART_SESSION = 'cart-session';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class CartService {
  localCart: CartItem[];
  total = 0;
  isLoggedIn: boolean;
  username: string;
  config = new MatSnackBarConfig();

  totalSubject = new BehaviorSubject(0);
  cartSubject = new BehaviorSubject([] as CartItem[]);

  constructor(private httpClient: HttpClient, private tokenService: TokenService, private snackBar: MatSnackBar, private zone: NgZone) {
    this.config.horizontalPosition = 'end';
    this.config.verticalPosition = 'bottom';
    this.config.duration = 5000;
    this.config.panelClass = ['mat-snack-bar-container'];
  }

  public open(message: string): void {
    this.zone.run(() => {
      this.snackBar.open(message, 'X', this.config);
    });
  }

  public getTotalOb(): Observable<number> {
    return this.totalSubject.asObservable();
  }

  private getTotal(): number {
    return this.localCart.reduce((total, cartItem) => total + cartItem.product.price * cartItem.quantity, 0);
  }

  public getItems(): Observable<CartItem[]> {
    this.isLoggedIn = !!this.tokenService.getToken();
    if (this.isLoggedIn) {
      this.username = this.tokenService.getUser().username;
      this.httpClient.get<CartItem[]>(CART_API + 'items/' + this.username, httpOptions).subscribe(
        data => {
          this.localCart = data;
          window.sessionStorage.setItem(CART_SESSION, JSON.stringify(this.localCart));
          this.cartSubject.next(this.localCart);
          this.total = this.getTotal();
          this.totalSubject.next(this.total);
        });
    } else {
      this.localCart = JSON.parse(window.sessionStorage.getItem(CART_SESSION)) || [];
      window.sessionStorage.setItem(CART_SESSION, JSON.stringify(this.localCart));
      this.cartSubject.next(this.localCart);
      this.total = this.getTotal();
      this.totalSubject.next(this.total);
    }
    return this.cartSubject.asObservable();
  }

  public addToCart(product: Product, quantity: number): CartItem[] {
    const query = this.localCart.filter(c => c.product.id === product.id);
    let newQuantity = quantity;
    if (query.length !== 0 && quantity !== 0) {
      newQuantity = quantity + query[0].quantity;
    }
    this.localCart = this.updateCart(product, newQuantity);
    return this.localCart;
  }

  public updateCart(product: Product, quantity: number): CartItem[] {
    this.isLoggedIn = !!this.tokenService.getToken();
    if (this.isLoggedIn) {
      this.username = this.tokenService.getUser().username;
      this.updateRemoteCart(product, quantity).subscribe(
        data => {
          this.localCart = data;
          this.cartSubject.next(this.localCart);
          this.total = this.getTotal();
          this.totalSubject.next(this.total);
          this.open('Carrello modificato con successo.');
        },
        error => {
          this.open('Prodotto non disponibile nella quantità richiesta.');
        }
      );
    } else {
      this.localCart = this.updateLocalCart(product, quantity);
      this.cartSubject.next(this.localCart);
      this.total = this.getTotal();
      this.totalSubject.next(this.total);
    }
    return this.localCart;
  }

  private updateLocalCart(product: Product, quantity: number): CartItem[] {
    for (const ci of this.localCart) {
      if (ci.product.id === product.id) {
        // Valuto se modificare la quantità o rimuovere del tutto
        if (quantity === 0) {
          this.localCart = this.localCart.filter(cartItem => cartItem.product.id !== product.id);
          window.sessionStorage.setItem(CART_SESSION, JSON.stringify(this.localCart));
          this.open('Carrello modificato con successo.');
          return this.localCart;
        } else {
          if (quantity < product.stock) {
            ci.quantity = quantity;
            window.sessionStorage.setItem(CART_SESSION, JSON.stringify(this.localCart));
            this.open('Carrello modificato con successo.');
            return this.localCart;
          } else {
            this.open('Prodotto non disponibile nella quantità richiesta.');
            return this.localCart;
          }
        }
      }
    }
    this.localCart.push(new CartItem(product, quantity));
    window.sessionStorage.setItem(CART_SESSION, JSON.stringify(this.localCart));
    this.open('Carrello aggiornato correttamente.');
    return this.localCart;
  }

  private updateRemoteCart(product: Product, quantity: number): Observable<CartItem[]> {
    return this.httpClient.post<CartItem[]>(CART_API + 'items/' + this.username, {
      product,
      quantity
    }, httpOptions);
  }

  public buyCart(order: Order): Observable<any> {
    this.localCart = [];
    window.sessionStorage.setItem(CART_SESSION, JSON.stringify(this.localCart));
    return this.httpClient.post(ORDER_API + 'buy/' + this.username, order, httpOptions);
  }

  public getOrders(): Observable<any> {
    return this.httpClient.get(ORDER_API + this.username, httpOptions);
  }
}
