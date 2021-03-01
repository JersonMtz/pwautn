import { Injectable } from '@angular/core';
import { ProductInterface } from '../../../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private product:ProductInterface;

  constructor() { }

  set setProduct(product:ProductInterface) {
    this.product = product;
  }

  get getProduct():ProductInterface {
    return this.product;
  }
}
