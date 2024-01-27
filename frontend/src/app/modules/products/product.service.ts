import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/shared/models/productModel';
import { apiUrl } from 'src/environments/apiurl';
import { ListResponse } from "../../shared/models/list-response";

interface ProductResponse {
  product: Product[];
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  //TODO: Add models to unknown
  //TODO: Change ProductResponse to ListResponse<Product>
  // (needed adjustments on backend)
  addProduct(data: any) {
    return this.http.post<unknown>(`${apiUrl}products`, data);
  }

  getAllProducts() {
    return this.http.get<ProductResponse>(`${apiUrl}products`);
  }

  deleteProduct(id: string) {
    return this.http.delete<unknown>(`${apiUrl}products/${id}`);
  }

  getProductBySupplier(id: string) {
    return this.http.get<unknown>(`${apiUrl}products/bySupplier/${id}`);
  }

  getDeliveryProductsByBox(boxId: string) {
    return this.http.get<ListResponse<Product[]>>(`${apiUrl}products/byBox/${boxId}`);
  }
}
