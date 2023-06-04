import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from 'src/assets/apiurl';

import { invoiceProducts } from 'src/app/models/invoiceProductsModel';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  constructor(private http: HttpClient) {}

  invoice = {
    invoiceNumber: '14214214',
    supplierId: '6471f804717a2af5865e3c8e',
    date: '2023-05-27T12:03:57.954+00:00',
    nettoPrice: 1000,
  };

  addInvoice(items: any) {
    return this.http.post(`${apiUrl}invoices`, items);
  }
}
