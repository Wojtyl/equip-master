import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/shared/models/productModel';
import { apiUrl } from 'src/environments/apiurl';
import { ListResponse } from "../../../shared/models/list-response";
import { ProductSize } from "../../../shared/models/productSizesModel";

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
    return this.http.get<ListResponse<Product[]>>(`${apiUrl}products`);
  }

  updateProduct(productId: string, formData: FormData) {
    return this.http.patch<ListResponse<Product>>(`${apiUrl}products/${productId}`, formData)
  }

  getDeliveryProductsByBox(boxId: string) {
    return this.http.get<ListResponse<Product[]>>(`${apiUrl}products/byBox/${boxId}`);
  }

  getProductById(productId: string) {
    return this.http.get<ListResponse<Product>>(`${apiUrl}products/${productId}`);
  }

  getProductSizes() {
    return this.http.get<ListResponse<ProductSize[]>>(`${apiUrl}products/sizes`);
  }

  addProductSize(value: {[key: string]: string}) {
    return this.http.post<ListResponse<ProductSize>>(`${apiUrl}products/sizes`, value)
  }

}
