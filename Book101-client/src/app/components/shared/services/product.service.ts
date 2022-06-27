import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from 'src/app/models/product';
import { PRODUCT_API } from 'src/app/config/api';
import {CartItem} from '../../../models/cart-item';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  constructor(private httpClient: HttpClient) {}


  public getProductsPagedByName(name: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(
      PRODUCT_API + 'byname' + '?name=' + name, httpOptions);
  }
  
  public getProductsPagedByCategory(category: string, pageNumber: number, pageSize: number, sortBy: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(
      PRODUCT_API + category + '/paged' + '?pageNumber=' + pageNumber + '&pageSize=' + pageSize + '&sortBy=' + sortBy, httpOptions);
  }

  // Get Products By Id
  public getProduct(id: number): Observable<Product> {
    return this.httpClient.get<Product>(PRODUCT_API + id, httpOptions);
  }
}
