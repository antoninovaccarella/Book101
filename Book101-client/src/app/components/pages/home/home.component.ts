import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../shared/services/product.service';
import {Product} from '../../../models/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  firstProds: Product[] = [];
  secondProds: Product[] = [];
  thirdProds: Product[] = [];
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProduct(1).subscribe(product => {
      this.firstProds.push(product);
    });
    this.productService.getProduct(2).subscribe(product => {
      this.firstProds.push(product);
    });
    this.productService.getProduct(3).subscribe(product => {
      this.firstProds.push(product);
    });

    this.productService.getProduct(11).subscribe(product => {
      this.secondProds.push(product);
    });
    this.productService.getProduct(12).subscribe(product => {
      this.secondProds.push(product);
    });
    this.productService.getProduct(13).subscribe(product => {
      this.secondProds.push(product);
    });

    this.productService.getProduct(15).subscribe(product => {
      this.thirdProds.push(product);
    });
    this.productService.getProduct(16).subscribe(product => {
      this.thirdProds.push(product);
    });
    this.productService.getProduct(17).subscribe(product => {
      this.thirdProds.push(product);
    });
    this.productService.getProduct(18).subscribe(product => {
      this.thirdProds.push(product);
    });
  }

}
