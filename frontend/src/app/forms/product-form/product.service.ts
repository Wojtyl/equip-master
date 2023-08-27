import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/productModel';
import { apiUrl } from 'src/assets/apiurl';

interface ProductResponse {
  product: Product[];
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  addProduct(data: any) {
    return this.http.post(`${apiUrl}products`, data);
  }

  getAllProducts() {
    return this.http.get<ProductResponse>(`${apiUrl}products`);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${apiUrl}products/${id}`);
  }

  getProductBySupplier(id: string) {
    return this.http.get<ProductResponse>(`${apiUrl}products/bySupplier/${id}`);
  }
}
