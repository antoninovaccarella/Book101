import {Component, OnInit} from '@angular/core';
import {Product} from 'src/app/models/product';
import {CartService} from '../../shared/services/cart.service';
import {ProductService} from '../../shared/services/product.service';
import {ActivatedRoute} from '@angular/router';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  public product: Product;
  public quantity = 1;

  constructor(private cartService: CartService, private productService: ProductService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
        const id = +params.id;
        this.productService.getProduct(id).subscribe(product => {
          this.product = product;
        });
      }
    );
  }

  ngOnInit(): void {

  }

  // Add to cart
  public addToCart(product: Product, quantity: number): void {
    this.cartService.addToCart(product, quantity);
  }

  increment(): void {
    this.quantity++;
  }

  decrement(): void {
    this.quantity--;
  }
}
