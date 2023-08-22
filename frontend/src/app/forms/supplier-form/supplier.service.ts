import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Supplier } from 'src/app/models/supplierModel';
import { apiUrl } from 'src/assets/apiurl';

interface AllSuppliersResponse {
  status: string;
  supplier: Supplier[];
}

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  constructor(private http: HttpClient) {}

  addSupplier(data: any) {
    return this.http.post(`${apiUrl}suppliers`, data);
  }

  getSupplierById(id: string) {}

  getAllSuppliers() {
    return this.http.get<AllSuppliersResponse>(`${apiUrl}suppliers`);
  }
}
