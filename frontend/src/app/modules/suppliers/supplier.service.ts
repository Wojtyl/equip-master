import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Supplier } from 'src/app/shared/models/supplierModel';
import { apiUrl } from 'src/environments/apiurl';
import { Observable } from "rxjs";
import { Invoice } from "../invoices/models/invoice-model";
import { Product } from "../../shared/models/productModel";
import { ListResponse } from "../../shared/models/list-response";

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  constructor(private http: HttpClient) {}

  addSupplier(data: any) {
    return this.http.post(`${apiUrl}suppliers`, data);
  }

  getAllSuppliers() {
    return this.http.get<ListResponse<Supplier[]>>(`${apiUrl}suppliers`);
  }

  getSupplierInvoices(supplierId: string): Observable<ListResponse<Invoice[]>> {
    return this.http.get<ListResponse<Invoice[]>>(`${apiUrl}suppliers/${supplierId}/invoices`)
  }

  getSupplierProducts(supplierId: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${apiUrl}suppliers/${supplierId}/products`);
  }
}
