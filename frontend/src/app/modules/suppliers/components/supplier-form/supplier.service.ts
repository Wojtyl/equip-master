import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Supplier } from 'src/app/shared/models/supplierModel';
import { apiUrl } from 'src/environments/apiurl';
import { Observable } from "rxjs";
import { Invoice } from "../../../invoices/models/invoice-model";
import { Product } from "../../../../shared/models/productModel";

interface AllSuppliersResponse {
  status: string;
  supplier: Supplier[];
}

interface SupplierInvoicesResponse {
  status: string;
  invoices: Invoice[];
}

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  constructor(private http: HttpClient) {}

  addSupplier(data: any) {
    return this.http.post(`${apiUrl}suppliers`, data);
  }

  getAllSuppliers() {
    return this.http.get<AllSuppliersResponse>(`${apiUrl}suppliers`);
  }

  getSupplierInvoices(supplierId: string): Observable<SupplierInvoicesResponse> {
    return this.http.get<SupplierInvoicesResponse>(`${apiUrl}suppliers/${supplierId}/invoices`)
  }

  getSupplierProducts(supplierId: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${apiUrl}suppliers/${supplierId}/products`);
  }
}
