import {Component, OnInit} from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/components/shared/services/cart.service';
import {ProductService} from '../../shared/services/product.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[];
  category = 'all';
  name = '';
  pageNumber = 0;
  pageNumberCurr = 1;
  pageSize = 9;
  sortBy = 'id';

  constructor(private cartService: CartService, private productService: ProductService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
        this.category = params.category;
        this.name = params.name;
      }
    );
    this.route.queryParams.subscribe(params => {
      if (!isNaN(params.pageNumber)) {
        this.pageNumber = +params.pageNumber;
        this.pageNumberCurr = this.pageNumber + 1;
        this.pageSize = params.pageSize;
        this.sortBy = params.sortBy;
      }
    });
    if(this.name) {
      this.productService.getProductsPagedByName(this.name).subscribe(
        (product) => {
          this.products = product;
        }
        );
      
    }
    else{
      this.productService.getProductsPagedByCategory(this.category, this.pageNumber, this.pageSize, this.sortBy).subscribe(
        (product) => {
          this.products = product;
        }
        );
    }
    
  }

  // Add to cart
  public addToCart(product: Product,  quantity: number = 1): void {
    this.cartService.addToCart(product, quantity);
  }

  pageForward(): void {
    this.pageNumber++;
    this.pageNumberCurr++;
  }

  pageBackward(): void {
    this.pageNumber--;
    this.pageNumberCurr--;
  }
}
