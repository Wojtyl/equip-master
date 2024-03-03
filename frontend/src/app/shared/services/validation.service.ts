import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { apiUrl } from "../../../environments/apiurl";
import { map } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor(private httpClient: HttpClient) {
  }

  public validateInvoiceNumber(invoiceNumber: string) {
    return this.httpClient.post<{ unique: boolean }>(`${apiUrl}validation/invoiceNumberUnique`, { invoiceNumber }).pipe(
      map(res => res.unique)
    );
  }

  public validateSupplierVatID(supplierVatId: string) {
    return this.httpClient.post<{ unique: boolean }>(`${apiUrl}validation/supplierVatIdUnique`, { supplierVatId }).pipe(
      map(res => res.unique)
    );
  }
}
